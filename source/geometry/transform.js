export class Transform {
    #transformations;
    #matrix;

    constructor(transformations, matrix) {
        this.#transformations = transformations;
        this.#matrix = matrix;
    }

    get changed() { return this.#transformations.some(transformation => transformation.changed); }

    get matrix() {
        if (this.changed) {
            this.#matrix.compose(this.#transformations.map(transformation => transformation.matrix));
        }

        return this.#matrix;
    }
}