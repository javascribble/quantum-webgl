import { Vector2 } from './vector2.js';

export class Vector3 extends Vector2 {
    constructor(buffer = [0, 0, 0], offset = 0, length = 3) {
        super(buffer, offset, length);
    }

    get z() { return this[2]; }
    set z(value) { this[2] = value; }

    static distance = (v3a, v3b) => Math.sqrt(Vector3.distanceSquared(v3a, v3b));

    static distanceSquared = (v3a, v3b) => Math.sqr(v3a[0] - v3b[0]) + Math.sqr(v3a[1] - v3b[1]) + Math.sqr(v3a[2] - v3b[2]);

    static dot = (v3a, v3b) => v3a[0] * v3b[0] + v3a[1] * v3b[1] + v3a[2] * v3b[2];

    static cross(v3a, v3b, v3c = new Vector3()) {
        v3c[0] = v3a[1] * v3b[2] - v3a[2] * v3b[1];
        v3c[1] = v3a[2] * v3b[0] - v3a[0] * v3b[2];
        v3c[2] = v3a[0] * v3b[1] - v3a[1] * v3b[0];
        return v3c;
    }

    static normalize(v3a, v3b = v3a) {
        const m = 1 / Math.hypot(v3a[0], v3a[1], v3a[2]);
        v3a[0] *= m;
        v3a[1] *= m;
        v3a[2] *= m;
        return v3b;
    }

    static sum(v3a, v3b, v3c = new Vector3()) {
        Vector2.sum(v3a, v3b, v3c);
        v3c[2] = v3a[2] + v3b[2];
        return v3c;
    }

    static difference(v3a, v3b, v3c = new Vector3()) {
        Vector2.difference(v3a, v3b, v3c);
        v3c[2] = v3a[2] - v3b[2];
        return v3c;
    }

    static product(v3a, v3b, v3c = new Vector3()) {
        Vector2.product(v3a, v3b, v3c);
        v3c[2] = v3a[2] * v3b[2];
        return v3c;
    }

    static quotient(v3a, v3b, v3c = new Vector3()) {
        Vector2.quotient(v3a, v3b, v3c);
        v3c[2] = v3a[2] / v3b[2];
        return v3c;
    }
}