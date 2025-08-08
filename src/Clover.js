/**
 * Clover module for parsing Clover XML coverage reports
 * This module converts Clover XML data into the project's internal data structures
 */

import { xml2json } from "xml-js";
import { Coverage, Folder, Stats } from "../types";

/**
 * Converts a value to an array, handling undefined, single items, and arrays
 * 
 * @param {*} arg - Value to convert to an array
 * @returns {Array} Array containing the value(s)
 */
const asList = (arg) =>
  !!arg ? (Array.isArray(arg) ? arg : [arg]) : [];

/**
 * Parses a Clover XML string and converts it to Stats
 * 
 * @param {string} str - Clover XML string
 * @returns {Stats} Stats object representing the coverage data
 */
export const fromString = (str) => {
  // Parse the XML to JSON
  const {
    coverage: {
      project: {
        metrics: { _attributes: m },
        file: files,
        package: packages,
      },
    },
  } = JSON.parse(xml2json(str, { compact: true }));

  // Combine files from packages and project root
  const allFiles = asList(packages).reduce(
    (acc, p) => [...acc, ...asList(p.file)],
    asList(files)
  );

  // Create Stats object from parsed data
  return new Stats(
    {
      // Create total metrics
      lines: new Coverage(m.statements, m.coveredstatements),
      methods: new Coverage(m.methods, m.coveredmethods),
      branches: new Coverage(m.conditionals, m.coveredconditionals),
    },
    allFiles
      // Normalize file names
      .map((f) => {
        f._attributes.name = f._attributes.path || f._attributes.name;
        return f;
      })
      // Sort files by name
      .sort((a, b) => (a._attributes.name < b._attributes.name ? -1 : 1))
      // Extract folder from file path
      .map((f) => ({
        ...f,
        folder: f._attributes.name.split("/").slice(0, -1).join("/"),
      }))
      // Group files by folder
      .reduce(
        (
          files,
          { folder, _attributes: { name }, metrics: { _attributes: m } }
        ) =>
          files.set(
            folder,
            (files.get(folder) || new Folder(folder)).push({
              name: name.split("/").pop(),
              metrics: {
                lines: new Coverage(m.statements, m.coveredstatements),
                methods: new Coverage(m.methods, m.coveredmethods),
                branches: new Coverage(m.conditionals, m.coveredconditionals),
              },
            })
          ),
        new Map()
      )
  );
};