export class Angle extends Float32Array {
    #degrees = 0;

    constructor(array = [0], offset = 0, length = 1) {
        super(array, offset, length);

        this.#degrees = Angle.convertRadians(array[0]);
    }

    get radians() { return this[0]; }
    set radians(value) {
        const radians = value % (2 * Math.PI);
        this.#degrees = Angle.convertRadians(radians);
        this[0] = radians;
    }

    get degrees() { return this.#degrees; }
    set degrees(value) {
        const degrees = value % 360;
        this.#degrees = degrees;
        this[0] = Angle.convertDegrees(degrees);
    }

    static convertDegrees = degrees => degrees * 180 / Math.PI;

    static convertRadians = radians => radians * Math.PI / 180;
}