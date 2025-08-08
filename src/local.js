// This is a modified version of index.js for local execution

// Mock the GitHub Actions core functions
import {CodeCoverage} from "./CodeCoverage.js";

const mockCore = {
  getInput: (name) => {
    // You can provide default values or read from command line arguments
    const args = process.argv.slice(2);
    const argIndex = args.findIndex(arg => arg === `--${name}`);
    if (argIndex !== -1 && argIndex + 1 < args.length) {
      return args[argIndex + 1];
    }
    return ''; // Default value if not provided
  },
  setFailed: (message) => {
    console.error(`Error: ${message}`);
    process.exit(1);
  },
  debug: console.debug,
  error: console.error,
  info: console.info,
  getBooleanInput: (name) => {
    const args = process.argv.slice(2);
    return args.includes(`--${name}`);
  },
  summary: {
    addRaw: () => {},
    write: async () => {}
  }
};

// Use the mock instead of the actual @actions/core
const { debug, error, getBooleanInput, getInput, info, setFailed, summary } = mockCore;

// The rest of the code remains the same
const file = getInput('file');

const coverage = new CodeCoverage(file);

coverage.run();