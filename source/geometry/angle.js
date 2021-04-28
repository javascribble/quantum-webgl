export class Angle {
    #radians = 0;
    #degrees = 0;

    get radians() { return this.#radians; }
    set radians(value) {
        this.#radians = value % 360;
        this.#degrees = Angle.radiansToDegrees(this.#radians);
    }

    get degrees() { return this.#degrees; }
    set degrees(value) {
        this.#degrees = value % (2 * Math.PI);
        this.#radians = Angle.degreesToRadians(this.#degrees);
    }

    static radiansToDegrees = radians => radians * 180 / Math.PI;

    static degreesToRadians = degrees => degrees * Math.PI / 180;
}