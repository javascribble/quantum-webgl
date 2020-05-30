const bindVertexAttribPointer = (context) => context.vertexAttribPointer.bind(context);
const bindVertexAttribIPointer = (context) => context.vertexAttribIPointer.bind(context);

export const getAttributeSetter = (context, location, type) => {
    switch (type) {
        case context.INT: return curryAttributeSetter(context, bindVertexAttribIPointer(context), location, context.INT, 4, 1);
        case context.FLOAT: return curryAttributeSetter(context, bindVertexAttribPointer(context), location, context.FLOAT, 4, 1);
        case context.FLOAT_VEC2: return curryAttributeSetter(context, bindVertexAttribPointer(context), location, context.FLOAT, 4, 1);
        case context.FLOAT_VEC3: return curryAttributeSetter(context, bindVertexAttribPointer(context), location, context.FLOAT, 4, 1);
        case context.FLOAT_VEC4: return curryAttributeSetter(context, bindVertexAttribPointer(context), location, context.FLOAT, 4, 1);
        case context.FLOAT_MAT3: return curryAttributeSetter(context, bindVertexAttribPointer(context), location, context.FLOAT, 4, 3);
        case context.FLOAT_MAT4: return curryAttributeSetter(context, bindVertexAttribPointer(context), location, context.FLOAT, 4, 4);
    }
};

const curryAttributeSetter = (context, setter, location, type, bytes, slots) => (attribute) => {
    if (attribute.divisor) {
        for (let i = 0; i < slots; i++) {
            const incrementalLocation = location + i;
            context.enableVertexAttribArray(incrementalLocation);
            context.vertexAttribDivisor(incrementalLocation, attribute.divisor);
        }

        const attributeComponents = attribute.components / slots;
        const attributeOffset = attributeComponents * bytes;
        for (let i = 0; i < slots; i++) {
            setter(location + i, attributeComponents, type, false, attribute.stride, attribute.offset + i * attributeOffset);
        }
    } else {
        context.enableVertexAttribArray(location);
        setter(location, attribute.components, type, false, attribute.stride, attribute.offset);
    }
};
