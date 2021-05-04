import { Matrix4 } from "../../matrix4.js";

export class Projection extends Matrix4 {
    orthographic(size = 1, aspect = 1, near = 0, far = 1) {
        const y = 1 / size;
        const x = y / aspect;
        const z = 2 / (far - near);
        this.set([
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ]);
    }

    perspective(size = Math.PI / 2, aspect = 1, near = 0, far = 1) {
        const d = 1 / Math.tan(size / 2);
        const r = 1 / (near - far);
        const x = d / aspect;
        const y = d;
        const z = (far + near) * r;
        const t = 2 * far * near * r;
        this.set([
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, -1,
            0, 0, t, 1
        ]);
    }
}