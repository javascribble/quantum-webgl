export const createVector3 = (type = Float32Array) => {
    const v3 = new type(3);
    setIdentityVector3(v3);
    return v3;
};

export const setIdentityVector3 = (v3) => {
    v3[0] = 0;
    v3[1] = 0;
    v3[2] = 0;
};

export const addVector3 = (v3a, v3b, v3c = createVector3()) => {
    v3c[0] = v3a[0] + v3b[0];
    v3c[1] = v3a[1] + v3b[1];
    v3c[2] = v3a[2] + v3b[2];
    return v3c;
};

export const subtractVector3 = (v3a, v3b, v3c = createVector3()) => {
    v3c[0] = v3a[0] - v3b[0];
    v3c[1] = v3a[1] - v3b[1];
    v3c[2] = v3a[2] - v3b[2];
    return v3c;
};

export const multiplyVector3 = (v3a, v3b, v3c = createVector3()) => {
    v3c[0] = v3a[0] * v3b[0];
    v3c[1] = v3a[1] * v3b[1];
    v3c[2] = v3a[2] * v3b[2];
    return v3c;
};

export const divideVector3 = (v3a, v3b, v3c = createVector3()) => {
    v3c[0] = v3a[0] / v3b[0];
    v3c[1] = v3a[1] / v3b[1];
    v3c[2] = v3a[2] / v3b[2];
    return v3c;
};

export const normalizeVector3 = (v3a, v3b = v3a) => {
    const m = 1 / Math.hypot(v3a[0], v3a[1], v3a[2]);
    v3a[0] *= m;
    v3a[1] *= m;
    v3a[2] *= m;
    return v3b;
};

export const crossProductVector3 = (v3a, v3b, v3c = createVector3()) => {
    v3c[0] = v3a[1] * v3b[2] - v3a[2] * v3b[1];
    v3c[1] = v3a[2] * v3b[0] - v3a[0] * v3b[2];
    v3c[2] = v3a[0] * v3b[1] - v3a[1] * v3b[0];
    return v3c;
};

export const dotProductVector3 = (v3a, v3b) => v3a[0] * v3b[0] + v3a[1] * v3b[1] + v3a[2] * v3b[2];

export const distanceVector3 = (v3a, v3b) => Math.sqrt(distanceSquaredVector3(v3a, v3b));

export const distanceSquaredVector3 = (v3a, v3b) => Math.pow(v3a[0] - v3b[0], 2) + Math.pow(v3a[1] - v3b[1], 2) + Math.pow(v3a[2] - v3b[2], 2);
