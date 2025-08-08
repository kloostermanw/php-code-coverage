import { existsSync, readFile } from "fs";
import { promisify } from "util";
import { fromString } from "./Clover.js";

export class Coverage {
    constructor(file) {
        if (!existsSync(file)) {
            throw `file "${file}" not found`;
        }

        this.file = file;
    }


    async run() {
        const cStats = fromString((await promisify(readFile)(this.file)).toString());
    }
}