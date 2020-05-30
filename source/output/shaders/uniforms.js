export const getUniformSetter = (context, location, type) => {
    switch (type) {
        case context.INT: return curryUniformSetter(context.uniform1i.bind(context), location);
        case context.FLOAT: return curryUniformSetter(context.uniform1fv.bind(context), location);
        case context.FLOAT_VEC2: return curryUniformSetter(context.uniform2fv.bind(context), location);
        case context.FLOAT_MAT3: return curryUniformSetter(context.uniformMatrix3fv.bind(context), location, true);
        case context.FLOAT_MAT4: return curryUniformSetter(context.uniformMatrix4fv.bind(context), location, true);
        case context.SAMPLER_2D: return curryUniformSetter(context.uniform1i.bind(context), location);
    }
};

const curryUniformSetter = (setter, location, matrix) => matrix ? (value) => setter(location, false, value) : (value) => setter(location, value);