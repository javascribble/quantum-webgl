export class Matrix4 extends Float32Array {
    constructor() {
        super([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }

    multiply(factor, product = new Matrix4()) {
        const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = this;
        const [b00, b01, b02, b03, b10, b11, b12, b13, b20, b21, b22, b23, b30, b31, b32, b33] = factor;
        product[0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
        product[1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
        product[2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
        product[3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
        product[4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
        product[5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
        product[6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
        product[7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
        product[8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
        product[9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
        product[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
        product[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
        product[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
        product[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
        product[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
        product[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
        return product;
    }
}