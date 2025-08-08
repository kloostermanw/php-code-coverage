
import {
    debug,
    error,
    getBooleanInput,
    getInput,
    info,
    setFailed,
    summary,
} from "@actions/core";
import {Coverage} from "./Coverage";



const file = getInput('file');


const coverage = new Coverage(file);

coverage.run();