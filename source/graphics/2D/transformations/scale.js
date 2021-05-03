import { Matrix3 } from '../../matrix3.js';
import { Vector2 } from '../../vector2.js';

export class Scale extends Vector2 {
    #matrix = new Matrix3();
    #changed = false;

    constructor() {
        super([1, 1]);
    }

    get changed() { return this.#changed; }

    set x(value) {
        super.x = value;
        this.#changed = true;
    }

    set y(value) {
        super.y = value;
        this.#changed = true;
    }

    get matrix() {
        if (this.#changed) {
            this.#changed = false;

            const matrix = this.#matrix;
            matrix[6] = this.x;
            matrix[7] = this.y;
        }

        return this.#matrix;
    }
}