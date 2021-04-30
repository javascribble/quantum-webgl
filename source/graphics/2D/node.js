import { Matrix3 } from '../matrix3.js';
import { Transform } from './transform.js';

export class Node extends Transform {
    #matrix = new Matrix3();

    parent;

    get changed() { return this.parent?.changed || super.changed }

    bind(buffer, offset) {
        buffer.set(this.#matrix, offset, this.#matrix.length);
        this.#matrix = new Matrix3(buffer, offset, this.#matrix.length);
    }

    update() {
        if (this.changed) {
            if (parent) {
                this.#matrix.compose(this.parent.matrix, this.matrix);
            } else {
                this.#matrix = this.matrix;
            }
        }
    }
}