
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

const input = {
    file: file,
    files: getInput('files') ?? '',
    workflowPath: getInput('workflow-path') ?? '/',
    repoPath: getInput('repo-path') ?? '/',
    workspace: getInput("dir-prefix") || process.env.GITHUB_WORKSPACE,
    signature: `<sub data-file=${JSON.stringify(file)}>${
        getInput("signature") ||
        ':robot: comment via <a href="https://github.com/kloostermanw/php-code-coverage">kloostermanw/php-code-coverage</a>'
    }</sub>`,
}

const coverage = new CodeCoverage(input);

coverage.run();