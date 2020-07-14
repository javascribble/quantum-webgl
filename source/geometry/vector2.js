export const createVector2 = (type = Float32Array) => {
    const v2 = type ? new type(2) : [];
    setIdentityVector2Array(v2);
    return v2;
};

export const setIdentityVector2 = (v2) => {
    v2[0] = 0;
    v2[1] = 0;
};

// TODO: Add object versions of all geometry functions.

export const distanceVector2 = (v2a, v2b) => Math.sqrt(distanceSquaredVector2(v2a, v2b));

export const distanceSquaredVector2 = (v2a, v2b) => Math.pow(v2a[0] - v2b[0], 2) + Math.pow(v2a[1] - v2b[1], 2);

export const distanceSquaredNormalizedVector2 = (v2a, v2b, v2c) => Math.pow(v2a[0] - v2b[0], 2) / Math.pow(v2c[0], 2) + Math.pow(v2a[1] - v2b[1], 2) / Math.pow(v2c[1], 2);