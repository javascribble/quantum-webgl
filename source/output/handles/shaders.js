export const createShader = (context, source, type) => {
    const shader = {
        source,
        type
    };

    applyShader(shader, context);
    return shader;
};

export const applyShader = (shader, context) => {
    restoreShader(shader, context);
    context.shaders.add(shader);
};

export const restoreShader = (shader, context) => {
    const handle = shader.handle = context.createShader(shader.type);
    context.shaderSource(handle, shader.source);
    context.compileShader(handle);
    if (!context.getShaderParameter(handle, context.COMPILE_STATUS)) {
        throw context.getShaderInfoLog(handle);
    }
};

export const deleteShader = (shader, context) => {
    context.shaders.delete(shader);
    context.deleteShader(shader.handle);
};
