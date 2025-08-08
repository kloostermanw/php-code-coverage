/**
 * Types module for the comment-coverage-clover project
 * This module defines the data structures used to represent code coverage information
 */

/**
 * Represents coverage metrics for a specific aspect (lines, methods, branches)
 */
export class Coverage {
    /** Total number of items that could be covered */
    total;

    /** Number of items that are actually covered */
    covered;

    /** Coverage percentage as a decimal (0.0 to 1.0) */
    percentual;

    /**
     * Creates a new Coverage instance
     *
     * @param total - Total number of items that could be covered
     * @param covered - Number of items that are actually covered
     */
    constructor(total, covered) {
        this.total = Number(total);
        this.covered = Number(covered);
        // Calculate percentage, handling division by zero
        this.percentual =
            this.total == 0
                ? 1.0
                : parseFloat((this.covered / this.total).toFixed(4));
    }
}