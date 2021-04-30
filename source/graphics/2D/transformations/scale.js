import { Matrix3 } from '../../matrix3.js';
import { Vector2 } from '../../vector2.js';

export class Scale extends Vector2 {
    #matrix = new Matrix3();

    get matrix() {
        if (this.changed) {
            this.changed = false;

            const matrix = this.#matrix;
            matrix[6] = this.x;
            matrix[7] = this.y;
        }
    }
}