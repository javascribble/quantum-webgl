import { createShader, restoreShader, deleteShader } from '../handles/shaders.js';
import { createProgram, restoreProgram, deleteProgram } from '../handles/programs.js';
import { createBuffer, restoreBuffer, deleteBuffer } from '../handles/buffers.js';
import { createTexture, restoreTexture, deleteTexture } from '../handles/textures.js';

const types = {
    shaders: { create: createShader, restore: restoreShader, delete: deleteShader },
    programs: { create: createProgram, restore: restoreProgram, delete: deleteProgram },
    buffers: { create: createBuffer, restore: restoreBuffer, delete: deleteBuffer },
    textures: { create: createTexture, restore: restoreTexture, delete: deleteTexture },
};

export const applyHandles = context => {
    for (const type in types) context[type] = new Map();

    context.allocate = data => {
        for (const type in data) {
            const cache = context[type];
            for (const configuration of data[type]) {
                if (cache.has(configuration.name)) {
                    cache.get(configuration.name).references++;
                } else {
                    const handle = types[type].create(configuration, context);
                    handle.references = 1;
                    cache.set(configuration.name, handle);
                }
            }
        }
    };

    context.deallocate = data => {
        for (const type in data) {
            const cache = context[type];
            for (const configuration of data[type]) {
                const handle = cache.get(configuration.name);
                if (handle.references-- === 0) {
                    types[type].delete(handle, context);
                    cache.delete(configuration.name);
                }
            }
        }
    };
};

export const restoreHandles = context => {
    for (const type in types) context[type].values.forEach(value => types[type].restore(value, context));
};