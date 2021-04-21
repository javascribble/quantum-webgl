export class Color extends Float32Array {
    constructor(buffer = [0, 0, 0, 1], offset = 0, length = 4) {
        super(buffer, offset, length);
    }

    get r() { return this[0]; }
    set r(value) { this[0] = value; }
    get g() { return this[1]; }
    set g(value) { this[1] = value; }
    get b() { return this[2]; }
    set b(value) { this[2] = value; }
    get h() { return this[0]; }
    set h(value) { this[0] = value; }
    get s() { return this[1]; }
    set s(value) { this[1] = value; }
    get v() { return this[2]; }
    set v(value) { this[2] = value; }
    get a() { return this[3]; }
    set a(value) { this[3] = value; }
}