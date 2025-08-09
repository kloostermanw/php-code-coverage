
import {
    debug,
    error,
    getBooleanInput,
    getInput,
    info,
    setFailed,
    summary,
} from "@actions/core";
import {CodeCoverage} from "./CodeCoverage.js";

const file = getInput('file');
const files = getInput('files');

const coverage = new CodeCoverage(file, files);

coverage.run();