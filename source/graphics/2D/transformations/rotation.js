import { Matrix3 } from '../../matrix3.js';
import { Angle } from '../../angle.js';

export class Rotation extends Angle {
    #matrix = new Matrix3();

    get matrix() {
        if (this.changed) {
            this.changed = false;

            const radians = this.radians;
            const sine = Math.sin(radians);
            const cosine = Math.cos(radians);

            const matrix = this.#matrix;
            matrix[0] = cosine;
            matrix[1] = -sine;
            matrix[3] = sine;
            matrix[4] = cosine;
        }
    }
}