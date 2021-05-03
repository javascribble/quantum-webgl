import { Matrix3 } from '../matrix3.js';

export class Camera extends Matrix3 {
    static orthographic(size = 1, aspect = 1) {
        const y = 1 / size, x = y / aspect;
        return new Camera([
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        ]);
    }
}