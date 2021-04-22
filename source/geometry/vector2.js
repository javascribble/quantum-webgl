export class Vector2 extends Float32Array {
    constructor(buffer = [0, 0], offset = 0, length = 2) {
        super(buffer, offset, length);
    }

    get x() { return this[0]; }
    set x(value) { this[0] = value; }
    get y() { return this[1]; }
    set y(value) { this[1] = value; }

    static distance = (v2a, v2b) => Math.sqrt(Vector2.distanceSquared(v2a, v2b));

    static distanceNormalized = (v2a, v2b, v2c) => Math.sqrt(Vector2.distanceSquaredNormalized(v2a, v2b, v2c));

    static distanceSquared = (v2a, v2b) => Math.sqr(v2a[0] - v2b[0]) + Math.sqr(v2a[1] - v2b[1]);

    static distanceSquaredNormalized = (v2a, v2b, v2c) => Math.sqr(v2a[0] - v2b[0]) / Math.sqr(v2c[0]) + Math.sqr(v2a[1] - v2b[1]) / Math.sqr(v2c[1]);

    static normalize(v2a, v2b = v2a) {
        const m = 1 / Math.hypot(v2a[0], v2a[1]);
        v2a[0] *= m;
        v2a[1] *= m;
        return v2b;
    }

    static sum(v2a, v2b, v2c = new Vector2()) {
        v2c[0] = v2a[0] + v2b[0];
        v2c[1] = v2a[1] + v2b[1];
        return v2c;
    }

    static difference(v2a, v2b, v2c = new Vector2()) {
        v2c[0] = v2a[0] - v2b[0];
        v2c[1] = v2a[1] - v2b[1];
        return v2c;
    }

    static product(v2a, v2b, v2c = new Vector2()) {
        v2c[0] = v2a[0] * v2b[0];
        v2c[1] = v2a[1] * v2b[1];
        return v2c;
    }

    static quotient(v2a, v2b, v2c = new Vector2()) {
        v2c[0] = v2a[0] / v2b[0];
        v2c[1] = v2a[1] / v2b[1];
        return v2c;
    }
}