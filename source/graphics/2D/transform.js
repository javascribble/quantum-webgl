import { Translation } from './transformations/translation.js';
import { Rotation } from './transformations/rotation.js';
import { Scale } from './transformations/scale.js';
import { Matrix3 } from '../matrix3.js';

export class Transform {
    #matrix = new Matrix3();

    constructor() {
        this.translation = new Translation();
        this.rotation = new Rotation();
        this.scale = new Scale();
    }

    get changed() { return this.translation.changed || this.rotation.changed || this.scale.changed }

    get matrix() {
        if (this.changed) {
            Matrix3.compose(this.scale.matrix, Matrix3.compose(this.translation.matrix, this.rotation.matrix), this.#matrix);
        }

        return this.#matrix;
    }
}