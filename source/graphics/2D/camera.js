import { Transform } from './transform.js';
import { Projection } from './transformations/projection.js';
import { draw } from '../../renderer/draw.js';
import { Matrix3 } from '../matrix3.js';

export class Camera extends Transform {
    #matrix = new Matrix3();

    projection = new Projection();

    render(context, drawables) {
        draw(context, drawables);
    }

    get matrix() {
        if (this.projection.changed) {
            Matrix3.compose(this.projection.matrix, super.matrix, this.#matrix);
        }

        return this.#matrix;
    }
}