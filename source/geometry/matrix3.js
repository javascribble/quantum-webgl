export const createMatrix3 = (type = Float32Array) => {
    const m3 = new type(9);
    setIdentityMatrix3(m3);
    return m3;
};

export const orthographicMatrix3 = (size = 100, aspect = 1) => {
    const scale = 1 / size;
    const m3 = createMatrix3();
    m3[0] = scale / aspect;
    m3[4] = scale;
    return m3;
};

export const setIdentityMatrix3 = (m3) => {
    m3[0] = 1;
    m3[1] = 0;
    m3[2] = 0;
    m3[3] = 0;
    m3[4] = 1;
    m3[5] = 0;
    m3[6] = 0;
    m3[7] = 0;
    m3[8] = 1;
};

export const setTranslationMatrix3 = (m3, v2) => {
    m3[6] = v2[0];
    m3[7] = v2[1];
};

export const setRotationMatrix3 = (m3, radians) => {
    const s = Math.sin(radians);
    const c = Math.cos(radians);
    m3[0] = c;
    m3[1] = -s;
    m3[3] = s;
    m3[4] = c;
};

export const setScaleMatrix3 = (m3, v2) => {
    m3[0] = v2[0];
    m3[4] = v2[1];
};

export const multiplyMatrix3 = (m3a, m3b, m3c) => {
    const
        a00 = m3a[0],
        a01 = m3a[1],
        a02 = m3a[2],
        a10 = m3a[3],
        a11 = m3a[4],
        a12 = m3a[5],
        a20 = m3a[6],
        a21 = m3a[7],
        a22 = m3a[8],
        b00 = m3b[0],
        b01 = m3b[1],
        b02 = m3b[2],
        b10 = m3b[3],
        b11 = m3b[4],
        b12 = m3b[5],
        b20 = m3b[6],
        b21 = m3b[7],
        b22 = m3b[8];

    m3c[0] = b00 * a00 + b01 * a10 + b02 * a20;
    m3c[1] = b00 * a01 + b01 * a11 + b02 * a21;
    m3c[2] = b00 * a02 + b01 * a12 + b02 * a22;
    m3c[3] = b10 * a00 + b11 * a10 + b12 * a20;
    m3c[4] = b10 * a01 + b11 * a11 + b12 * a21;
    m3c[5] = b10 * a02 + b11 * a12 + b12 * a22;
    m3c[6] = b20 * a00 + b21 * a10 + b22 * a20;
    m3c[7] = b20 * a01 + b21 * a11 + b22 * a21;
    m3c[8] = b20 * a02 + b21 * a12 + b22 * a22;
};
