/**
 * Clover module for parsing Clover XML coverage reports
 * This module converts Clover XML data into the project's internal data structures
 */

import { xml2json } from "xml-js";
import { Coverage, Folder, Stats } from "./types.js";

/**
 * Converts a value to an array, handling undefined, single items, and arrays
 * 
 * @param {*} arg - Value to convert to an array
 * @returns {Array} Array containing the value(s)
 */
const asList = (arg) =>
  !!arg ? (Array.isArray(arg) ? arg : [arg]) : [];

/**
 * Preprocesses XML string to fix common issues
 * 
 * @param {string} xmlStr - The XML string to preprocess
 * @returns {string} The preprocessed XML string
 */
const preprocessXml = (xmlStr) => {
  // Replace invalid attribute characters with valid ones
  // This regex looks for attribute values with unescaped quotes
  let processed = xmlStr.replace(/=\s*"([^"]*?)"/g, (match, p1) => {
    // Replace any quotes inside attribute values with &quot;
    const sanitized = p1.replace(/"/g, '&quot;');
    return `="${sanitized}"`;
  });
  
  // Fix attributes with missing names (e.g., ="value")
  processed = processed.replace(/\s+="([^"]*?)"/g, ' fixed="$1"');
  
  return processed;
};

/**
 * Parses a Clover XML string and converts it to Stats
 * 
 * @param {string} str - Clover XML string
 * @returns {Stats} Stats object representing the coverage data
 */
export const fromString = (str) => {
  try {
    // Preprocess the XML string to fix common issues
    const preprocessedStr = preprocessXml(str);
    
    // Parse the XML to JSON
    const {
      coverage: {
        project: {
          metrics: { _attributes: m },
          file: files,
          package: packages,
        },
      },
    } = JSON.parse(xml2json(preprocessedStr, { compact: true }));

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
  } catch (error) {
    console.error("Error parsing XML file:", error.message);
    // Return empty stats object when parsing fails
    return new Stats(
      {
        lines: new Coverage(0, 0),
        methods: new Coverage(0, 0),
        branches: new Coverage(0, 0),
      },
      new Map()
    );
  }
};