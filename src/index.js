
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
    workspace: getInput("dir-prefix") || process.env.GITHUB_WORKSPACE,
    token: getInput("github-token") || process.env.GITHUB_TOKEN,
}

const coverage = new CodeCoverage(input);

coverage.run();