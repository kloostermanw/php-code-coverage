/**
 * Classes for representing code coverage data
 */

/**
 * Represents coverage statistics for a specific metric
 */
export class Coverage {
  /**
   * Create a new Coverage instance
   * 
   * @param {number} total - Total number of items
   * @param {number} covered - Number of covered items
   */
  constructor(total, covered) {
    this.total = total;
    this.covered = covered;
  }
}

/**
 * Represents a folder containing files with coverage data
 */
export class Folder {
  /**
   * Create a new Folder instance
   * 
   * @param {string} path - Path of the folder
   */
  constructor(path) {
    this.path = path;
    this.files = [];
  }

  /**
   * Add a file to the folder
   * 
   * @param {Object} file - File to add
   * @returns {Folder} This folder instance for chaining
   */
  push(file) {
    this.files.push(file);
    return this;
  }
}

/**
 * Represents overall statistics for code coverage
 */
export class Stats {
  /**
   * Create a new Stats instance
   * 
   * @param {Object} metrics - Overall metrics
   * @param {Map<string, Folder>} folders - Map of folders with coverage data
   */
  constructor(metrics, folders) {
    this.metrics = metrics;
    this.folders = folders;
  }
}