export const createBuffer = (configuration, context) => {
    const buffer = {
        source: configuration.source ? new Float32Array(configuration.source) : null,
        target: context[configuration.target] || configuration.target || context.ARRAY_BUFFER,
        usage: context[configuration.usage] || configuration.usage || context.DYNAMIC_DRAW,
        attributes: [...configuration.attributes],
        offset: configuration.offset || 0,
        changed: !!configuration.source
    };

    restoreBuffer(buffer, context);
    return buffer;
};

export const restoreBuffer = (buffer, context) => buffer.handle = context.createBuffer();

export const bindBuffer = (buffer, context) => context.bindBuffer(buffer.target, buffer.handle);

export const bufferData = (buffer, context) => {
    if (buffer.offset) {
        context.bufferSubData(buffer.target, buffer.offset, buffer.source);
    } else {
        context.bufferData(buffer.target, buffer.source, buffer.usage);
    }
};

export const deleteBuffer = (buffer, context) => context.deleteBuffer(buffer.handle);