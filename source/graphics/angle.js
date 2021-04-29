export class Angle {
    #radians = 0;
    #degrees = 0;

    get radians() { return this.#radians; }
    set radians(value) {
        this.changed = true;
        this.#radians = value % (2 * Math.PI);
        this.#degrees = this.#radians * 180 / Math.PI;
    }

    get degrees() { return this.#degrees; }
    set degrees(value) {
        this.changed = true;
        this.#degrees = value % 360;
        this.#radians = this.#degrees * Math.PI / 180;
    }
}