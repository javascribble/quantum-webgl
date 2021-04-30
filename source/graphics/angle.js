export class Angle extends Float32Array {
    #degrees = 0;

    constructor(array = [0], offset = 0, length = 1) {
        super(array, offset, length);
    }

    get radians() { return this[0]; }
    set radians(value) {
        this.changed = true;
        const radians = value % (2 * Math.PI);
        this.#degrees = radians * 180 / Math.PI;
        this[0] = radians;
    }

    get degrees() { return this.#degrees; }
    set degrees(value) {
        this.changed = true;
        this.#degrees = value % 360;
        this[0] = this.#degrees * Math.PI / 180;
    }
}