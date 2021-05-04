import { Matrix3 } from '../../matrix3.js';

export class Projection extends Matrix3 {
    orthographic(size = 1, aspect = 1) {
        const y = 1 / size;
        const x = y / aspect;
        this.set([
            x, 0, 0,
            0, y, 0,
            0, 0, -1
        ]);
    }
}