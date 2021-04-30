export class Matrix3 extends Float32Array {
    constructor(array = [1, 0, 0, 0, 1, 0, 0, 0, 1], offset = 0, length = 9) {
        super(array, offset, length);
    }

    static compose(m3a, m3b, result = new Matrix3()) {
        const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = m3a;
        const [b00, b01, b02, b10, b11, b12, b20, b21, b22] = m3b;
        result[0] = b00 * a00 + b01 * a10 + b02 * a20;
        result[1] = b00 * a01 + b01 * a11 + b02 * a21;
        result[2] = b00 * a02 + b01 * a12 + b02 * a22;
        result[3] = b10 * a00 + b11 * a10 + b12 * a20;
        result[4] = b10 * a01 + b11 * a11 + b12 * a21;
        result[5] = b10 * a02 + b11 * a12 + b12 * a22;
        result[6] = b20 * a00 + b21 * a10 + b22 * a20;
        result[7] = b20 * a01 + b21 * a11 + b22 * a21;
        result[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return result;
    }

    compose(...matrices) {
        matrices.forEach(matrix => Matrix3.compose(this, matrix, this));
    }
}