import { Vector2 } from './vector2.js';

export class Vector3 extends Vector2 {
    constructor(array = [0, 0, 0], offset = 0, length = 3) {
        super(array, offset, length);
    }

    get z() { return this[2]; }
    set z(value) { this[2] = value; }
}