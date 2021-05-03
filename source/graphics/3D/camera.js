import { Matrix4 } from "../matrix4.js";

export class Camera extends Matrix4 {
    static orthographic(size = 1, aspect = 1) {
        const z = 1 / size, y = 1 / size, x = y / aspect;
        return new Camera([
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ]);
    }

    static perspective(radians = Math.PI / 2, aspect = 1, near = 0, far = 1) {
        const d = 1 / Math.tan(radians / 2), r = 1 / (near - far);
        const x = d / aspect, y = d, z = (far + near) * r, t = 2 * far * near * r;
        return new Camera([
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, -1,
            0, 0, t, 1
        ]);
    }
}