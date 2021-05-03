export class Angle extends Float32Array {
    #degrees = 0;

    constructor(array = [0], offset = 0, length = 1) {
        super(array, offset, length);

        this.#degrees = array[0] * Angle.degreeRatio;
    }

    get radians() { return this[0]; }
    set radians(value) {
        const radians = value % (2 * Math.PI);
        this.#degrees = radians * Angle.degreeRatio;
        this[0] = radians;
    }

    get degrees() { return this.#degrees; }
    set degrees(value) {
        const degrees = value % 360;
        this.#degrees = degrees;
        this[0] = degrees * Angle.radianRatio;
    }

    static degreeRatio = 180 / Math.PI;

    static radianRatio = Math.PI / 180;
}