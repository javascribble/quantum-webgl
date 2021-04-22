export const createShader = (configuration, context) => {
    const shader = {
        type: context[configuration.type] || configuration.type,
        source: configuration.source
    };

    restoreShader(shader, context);
    return shader;
};

export const restoreShader = (shader, context) => {
    const handle = shader.handle = context.createShader(shader.type);
    context.shaderSource(handle, shader.source);
    context.compileShader(handle);
    if (!context.getShaderParameter(handle, context.COMPILE_STATUS)) {
        throw context.getShaderInfoLog(handle);
    }
};

export const deleteShader = (shader, context) => context.deleteShader(shader.handle);