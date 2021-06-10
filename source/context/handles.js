import { createShader, restoreShader, deleteShader } from '../handles/shaders.js';
import { createProgram, restoreProgram, deleteProgram } from '../handles/programs.js';
import { createBuffer, restoreBuffer, deleteBuffer } from '../handles/buffers.js';
import { createTexture, restoreTexture, deleteTexture } from '../handles/textures.js';
import { HandleMap } from '../collections/maps.js';

const types = {
    shaders: { createHandle: createShader, restoreHandle: restoreShader, deleteHandle: deleteShader },
    programs: { createHandle: createProgram, restoreHandle: restoreProgram, deleteHandle: deleteProgram },
    buffers: { createHandle: createBuffer, restoreHandle: restoreBuffer, deleteHandle: deleteBuffer },
    textures: { createHandle: createTexture, restoreHandle: restoreTexture, deleteHandle: deleteTexture },
};

export const applyHandles = context => {
    for (const [type, methods] of Object.entries(types)) {
        const allocate = options => methods.createHandle(options, context);
        const deallocate = handle => methods.deleteHandle(handle, context);
        const reallocate = handle => methods.restoreHandle(handle, context);
        context[type] = new HandleMap(allocate, deallocate, reallocate);
    }
};

export const restoreHandles = context => {
    for (const type in types) {
        context[type].restore();
    }
};