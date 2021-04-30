import { Matrix3 } from '../../matrix3.js';
import { Vector2 } from '../../vector2.js';

export class Translation extends Vector2 {
    #matrix = new Matrix3();

    get matrix() {
        if (this.changed) {
            this.changed = false;

            const matrix = this.#matrix;
            matrix[0] = this.x;
            matrix[4] = this.y;
        }
    }
}