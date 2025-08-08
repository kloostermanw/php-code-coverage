/**
 * Represents a folder containing source files
 */
export class Folder {
    /**
     * Creates a new Folder instance
     *
     * @param name - Name of the folder
     */
    constructor(name) {
        this.name = name;
        this.files = [];
    }

    /**
     * Adds files to the folder
     *
     * @param files - Files to add
     * @returns The folder instance for chaining
     */
    push(...files) {
        this.files.push(...files);
        return this;
    }

    /**
     * Gets a file by name
     *
     * @param name - Name of the file to get
     * @returns The file if found, null otherwise
     */
    get(name) {
        const i = this.files.findIndex((f) => f.name === name);
        return i === -1 ? null : this.files[i];
    }
}