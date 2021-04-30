export class Vector2 extends Float32Array {
    constructor(array = [0, 0], offset = 0, length = 2) {
        super(array, offset, length);
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

    static distance = (a, b) => Math.sqrt(a.reduce((d, v, i) => d + Math.pow(v - b[i], 2)));

    static sum(a, b, sum = new this.constructor()) {
        for (let i = 0; i < sum.length; i++) sum[i] = a[i] + b[i];
        return sum;
    }

    static difference(a, b, difference = new this.constructor()) {
        for (let i = 0; i < difference.length; i++) difference[i] = a[i] - b[i];
        return difference;
    }

    static normalize(vector, result = new this.constructor()) {
        const magnitude = 1 / Math.hypot(...vector);
        for (let i = 0; i < vector.length; i++) result[i] = vector[i] * magnitude;
        return result;
    }

    add(...addends) {
        addends.forEach(addend => this.constructor.sum(this, addend, this));
    }

    subtract(...subtrahends) {
        subtrahends.forEach(subtrahend => this.constructor.difference(this, subtrahend, this));
    }

    normalize() {
        this.constructor.normalize(this, this);
    }
}