import { Matrix3 } from '../matrix3.js';

// TODO: Add view matrix.
export class Camera extends Matrix3 {
    static orthographic(size = 1, aspect = 1) {
        const y = 1 / size, x = y / aspect;
        return [
            x, 0, 0,
            0, y, 0,
            0, 0, 1
        ];
    }
}