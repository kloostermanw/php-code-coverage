



/**
 * Represents overall statistics for code coverage
 */
export class Stats {
    /**
     * Creates a new Stats instance
     *
     * @param total - Total coverage metrics for the project
     * @param folders - Map of folders containing files
     */
    constructor(total, folders) {
        this.total = total;
        this.folders = folders;
    }

    get(folder, file) {
        return this.folders.get(folder)?.get(file);
    }
}