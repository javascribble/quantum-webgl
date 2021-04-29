export class Vector3 extends Float32Array {
    constructor() {
        super([0, 0, 0]);
    }

    get x() { return this[0]; }
    set x(value) {
        this.changed = true;
        this[0] = value;
    }

    get y() { return this[1]; }
    set y(value) {
        this.changed = true;
        this[1] = value;
    }

    get z() { return this[2]; }
    set z(value) {
        this.changed = true;
        this[2] = value;
    }
}