import { Matrix3 } from '../geometry/matrix3.js';
import { Node } from './node.js';

export class Camera extends Node {
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

// orthographic(size = 1, aspect = 1, near = 0, far = 1) {
//     const y = 1 / size;
//     const x = y / aspect;
//     const z = 2 / (far - near);
//     this.set([
//         x, 0, 0, 0,
//         0, y, 0, 0,
//         0, 0, z, 0,
//         0, 0, 0, 1
//     ]);
// }

// perspective(size = Math.PI / 2, aspect = 1, near = 0, far = 1) {
//     const d = 1 / Math.tan(size / 2);
//     const r = 1 / (near - far);
//     const x = d / aspect;
//     const y = d;
//     const z = (far + near) * r;
//     const t = 2 * far * near * r;
//     this.set([
//         x, 0, 0, 0,
//         0, y, 0, 0,
//         0, 0, z, -1,
//         0, 0, t, 1
//     ]);
// }