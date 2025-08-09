import { existsSync, readFile } from "fs";
import { promisify } from "util";
import { fromString } from "./Clover.js";
import { getOctokit } from "@actions/github";
import { context } from "@actions/github/lib/utils";
import {error, getInput} from "@actions/core";

export class CodeCoverage {
    constructor(input) {
        if (!existsSync(input.file)) {
            throw `file "${input.file}" not found`;
        }

        const token = getInput("github-token") || process.env.GITHUB_TOKEN;

        this.github = input.token ? getOctokit(token) : null;

        console.log(input);

        this.signature = input.signature;
        this.file = input.file;
        this.files = input.files.split(',')
            .map(file => input.workflowPath + file.replace(input.repoPath, ""));
    }

    async run() {
        // Parse current coverage file
        const cStats = fromString((await promisify(readFile)(this.file)).toString());

        console.log(cStats);
        this.checkThreshold(cStats);

        // Exit if not in a pull request context
        if (context.eventName !== "pull_request") {
            console.log("Not in a pull request context");
            return;
        }

        const isFork =
            `${context.repo.owner}/${context.repo.repo}` !==
            context.payload.pull_request?.head?.repo?.full_name;

        // Exit if the pull request is from a fork
        if (isFork) {
            return;
        }

        // Exit if no GitHub token is provided
        if (!this.github) {
            console.log("No GitHub token provided, skipping comment functionality");
            return;
        }
        const commit = context.payload.pull_request?.head.sha.substring(0, 7);
        let filter = (commit) => commit?.user?.type === "Bot";

        let commentId = null;

        try {
            const comments = (
                await this.github.rest.issues.listComments({
                    ...context.repo,
                    issue_number: context.issue.number,
                })
            ).data.filter(filter);

            for (let i = comments.length - 1; i >= 0; i--) {
                const c = comments[i];
                if (!c.body?.includes(this.signature)) continue;
                commentId = c.id;
                break;
            }
        } catch (e) {
            error(e);
        }
    }

    checkThreshold(cStats) {
        console.log(cStats.total.lines.percentual * 100);
        console.log(cStats.total.methods.percentual * 100);
        console.log(this.files);

        this.files.forEach(file => {
            const lastSlashIndex = file.lastIndexOf('/');
            const fStats = cStats.get(file.substring(0, lastSlashIndex), file.substring(lastSlashIndex + 1));
            console.log(fStats);
        })
    }
}

