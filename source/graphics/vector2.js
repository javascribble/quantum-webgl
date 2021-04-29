export class Vector2 extends Float32Array {
    constructor() {
        super([0, 0]);
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

    add(addend, sum = this) {
        for (let i = 0; i < this.length; i++) sum[i] = this[i] + addend[i];
    }

    subtract(subtrahend, difference = this) {
        for (let i = 0; i < this.length; i++) difference[i] = this[i] - subtrahend[i];
    }

    multiply(multiplier, product = this) {
        for (let i = 0; i < this.length; i++) product[i] = this[i] * multiplier[i];
    }

    divide(divisor, quotient = this) {
        for (let i = 0; i < this.length; i++) quotient[i] = this[i] / divisor[i];
    }

    normalize() {
        const magnitude = 1 / Math.hypot(...this);
        for (let i = 0; i < this.length; i++) this[i] *= magnitude;
    }

    distance(point) {
        let distance = 0;
        for (let i = 0; i < this.length; i++) distance += Math.pow(this[i] - point[i], 2);
        return Math.sqrt(distance);
    }
}