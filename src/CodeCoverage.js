import { existsSync, readFile } from "fs";
import { promisify } from "util";
import { fromString } from "./Clover.js";

export class CodeCoverage {
    constructor(file, files) {
        if (!existsSync(file)) {
            throw `file "${file}" not found`;
        }

        this.file = file;
        this.files = files.split(',');
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

