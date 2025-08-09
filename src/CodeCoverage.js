import { existsSync, readFile } from "fs";
import { promisify } from "util";
import { fromString } from "./Clover.js";

export class CodeCoverage {
    constructor(input) {
        if (!existsSync(input.file)) {
            throw `file "${input.file}" not found`;
        }

        console.log(input);

        this.file = input.file;
        this.files = input.files.split(',')
            .map(file => input.workflowPath + file.replace(input.repoPath, ""));
    }

    async run() {
        // Parse current coverage file
        const cStats = fromString((await promisify(readFile)(this.file)).toString());

        console.log(cStats);
        this.checkThreshold(cStats);
    }

    checkThreshold(cStats) {
        console.log(cStats.total.lines.percentual * 100);
        console.log(cStats.total.methods.percentual * 100);
        console.log(this.files);
    }
}

