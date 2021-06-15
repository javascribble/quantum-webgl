export const createBuffer = (configuration, context) => {
    const buffer = {
        data: configuration.data ? new Float32Array(configuration.data) : null,
        target: context[configuration.target] || configuration.target || context.ARRAY_BUFFER,
        usage: context[configuration.usage] || configuration.usage || context.DYNAMIC_DRAW,
        attributes: [...configuration.attributes],
        offset: configuration.offset || 0,
        changed: !!configuration.data
    };

    restoreBuffer(buffer, context);
    return buffer;
};

export const restoreBuffer = (buffer, context) => buffer.handle = context.createBuffer();

export const bindBuffer = (buffer, context) => context.bindBuffer(buffer.target, buffer.handle);

export const bufferData = (buffer, context) => {
    if (buffer.offset) {
        context.bufferSubData(buffer.target, buffer.offset, buffer.data);
    } else {
        context.bufferData(buffer.target, buffer.data, buffer.usage);
    }
};

export const deleteBuffer = (buffer, context) => context.deleteBuffer(buffer.handle);