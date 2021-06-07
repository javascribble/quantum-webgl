import { Matrix3 } from '../matrix3.js';
import { Angle } from '../angle.js';

export class Rotation extends Angle {
    #matrix = new Matrix3();
    #changed = false;

    get changed() { return this.#changed; }

    get radians() { return super.radians; }
    set radians(value) {
        super.radians = value;
        this.#changed = true;
    }

    get degrees() { return super.degrees; }
    set degrees(value) {
        super.degrees = value;
        this.#changed = true;
    }

    get matrix() {
        if (this.#changed) {
            this.#changed = false;

            const radians = this[0];
            const sine = Math.sin(radians);
            const cosine = Math.cos(radians);

            const matrix = this.#matrix;
            matrix[0] = cosine;
            matrix[1] = -sine;
            matrix[3] = sine;
            matrix[4] = cosine;
        }

        return this.#matrix;
    }
}