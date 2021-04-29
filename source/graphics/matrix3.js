export class Matrix3 extends Float32Array {
    constructor() {
        super([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    }

    multiply(factor, product = new Matrix3()) {
        const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = this;
        const [b00, b01, b02, b10, b11, b12, b20, b21, b22] = factor;
        product[0] = b00 * a00 + b01 * a10 + b02 * a20;
        product[1] = b00 * a01 + b01 * a11 + b02 * a21;
        product[2] = b00 * a02 + b01 * a12 + b02 * a22;
        product[3] = b10 * a00 + b11 * a10 + b12 * a20;
        product[4] = b10 * a01 + b11 * a11 + b12 * a21;
        product[5] = b10 * a02 + b11 * a12 + b12 * a22;
        product[6] = b20 * a00 + b21 * a10 + b22 * a20;
        product[7] = b20 * a01 + b21 * a11 + b22 * a21;
        product[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return product;
    }
}