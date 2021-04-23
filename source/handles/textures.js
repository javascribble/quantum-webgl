export const createTexture = (configuration, context) => {
    // TODO: Support text based texture parameter configuration.
    const texture = {
        parameters: configuration.parameters || [{ name: context.TEXTURE_MIN_FILTER, value: context.LINEAR }],
        target: context[configuration.target] || configuration.target || context.TEXTURE_2D,
        type: context[configuration.type] || configuration.type || context.UNSIGNED_BYTE,
        format: context[configuration.format] || configuration.format || context.RGBA,
        changed: !!configuration.data,
        data: configuration.data
    };

    restoreTexture(texture, context);
    return texture;
};

export const restoreTexture = (texture, context) => texture.handle = context.createTexture();

export const bindTexture = (texture, context) => {
    context.activeTexture(context.TEXTURE0 + texture.unit);
    context.bindTexture(texture.target, texture.handle);
}

export const bufferTexture = (texture, context) => {
    for (const parameter of texture.parameters) {
        //context.texParameteri(texture.target, parameter.name, parameter.value);
        context.texParameterf(texture.target, parameter.name, parameter.value);
    }

    context.texImage2D(texture.target, /* mipmap */ 0, texture.format, texture.format, texture.type, texture.data);
};

export const deleteTexture = (texture, context) => context.deleteTexture(texture.handle);