import { Matrix3 } from '../../matrix3.js';

export class Projection {
    #matrix = new Matrix3();
    #changed = false;
    #aspect = 1;
    #size = 1;

    get changed() { return this.#changed; }

    get size() { return this.#size; }
    set size(value) {
        this.#size = value;
        this.#changed = true;
    }

    get aspect() { return this.#aspect; }
    set aspect(value) {
        this.#aspect = value;
        this.#changed = true;
    }

    get matrix() {
        if (this.#changed) {
            this.#changed = false;
            const y = 1 / this.#size; // -2 / h
            const x = y / this.#aspect; // 2 / w
            this.#matrix.set([
                x, 0, 0,
                0, y, 0,
                0, 0, -1 //-1, 1, 1
            ]);
        }

        return this.#matrix;
    }
}