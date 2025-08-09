
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

const input = {
    file: getInput('file'),
    files: getInput('files') ?? '',
    workflowPath: getInput('workflow-path') ?? '/',
    repoPath: getInput('repo-path') ?? '/',
}

const coverage = new CodeCoverage(input);

coverage.run();