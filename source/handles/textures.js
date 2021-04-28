﻿import { textureOptions } from '../constants/context.js';

export const createTexture = (configuration, context) => {
    const texture = {
        parameters: Object.fromEntries(Object.entries({ ...textureOptions, ...configuration.parameters }).map(([key, value]) => [context[key] || key, context[value] || value])),
        target: context[configuration.target] || configuration.target || context.TEXTURE_2D,
        type: context[configuration.type] || configuration.type || context.UNSIGNED_BYTE,
        format: context[configuration.format] || configuration.format || context.RGBA,
        unit: configuration.unit || 0,
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
    for (const [name, value] of Object.entries(texture.parameters)) {
        //context.texParameteri(texture.target, name, value);
        context.texParameterf(texture.target, name, value);
    }

    context.texImage2D(texture.target, /* mipmap */ 0, texture.format, texture.format, texture.type, texture.data);
};

export const deleteTexture = (texture, context) => context.deleteTexture(texture.handle);