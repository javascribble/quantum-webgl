export const createVector4 = (type = Float32Array) => {
    const v4 = new type(4);
    setIdentityVector4(v4);
    return v4;
};

export const setIdentityVector4 = (v4) => {
    v4[0] = 0;
    v4[1] = 0;
    v4[2] = 0;
    v4[3] = 1;
};
