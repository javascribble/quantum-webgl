import { Vector2 } from './vector2.js';

export class Vector3 extends Vector2 {
    constructor(array = [0, 0, 0], offset = 0, length = 3) {
        super(array, offset, length);
    }

    get z() { return this[2]; }
    set z(value) { this[2] = value; }

    static dot = (a, b) => a.reduce((d, v, i) => d + v * b[i]);

    static cross(a, b, result = new this.constructor()) {
        const length = result.length;
        for (let i = 0; i < length; i++) {
            const row = (i + 1) % length
            const column = (i + 2) % length;
            result[i] = a[row] * b[column] - a[column] * b[row];
        }

        return result;
    }
}