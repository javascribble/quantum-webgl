export class Matrix3 extends Float32Array {
    constructor(buffer = [1, 0, 0, 0, 1, 0, 0, 0, 1], offset = 0, length = 9) {
        super(buffer, offset, length);
    }

    static orthographic(size = 1, aspect = 1) {
        const m3 = new Matrix3();
        const scale = 1 / size;
        m3[0] = scale / aspect;
        m3[4] = scale;
        return m3;
    }

    static product(m3a, m3b, m3c) {
        const
            a00 = m3a[0], a01 = m3a[1], a02 = m3a[2],
            a10 = m3a[3], a11 = m3a[4], a12 = m3a[5],
            a20 = m3a[6], a21 = m3a[7], a22 = m3a[8],
            b00 = m3b[0], b01 = m3b[1], b02 = m3b[2],
            b10 = m3b[3], b11 = m3b[4], b12 = m3b[5],
            b20 = m3b[6], b21 = m3b[7], b22 = m3b[8];

        m3c[0] = b00 * a00 + b01 * a10 + b02 * a20;
        m3c[1] = b00 * a01 + b01 * a11 + b02 * a21;
        m3c[2] = b00 * a02 + b01 * a12 + b02 * a22;
        m3c[3] = b10 * a00 + b11 * a10 + b12 * a20;
        m3c[4] = b10 * a01 + b11 * a11 + b12 * a21;
        m3c[5] = b10 * a02 + b11 * a12 + b12 * a22;
        m3c[6] = b20 * a00 + b21 * a10 + b22 * a20;
        m3c[7] = b20 * a01 + b21 * a11 + b22 * a21;
        m3c[8] = b20 * a02 + b21 * a12 + b22 * a22;
    }
}