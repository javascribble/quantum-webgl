import { createShader, restoreShader, deleteShader } from '../handles/shaders.js';
import { createProgram, restoreProgram, deleteProgram } from '../handles/programs.js';
import { createBuffer, restoreBuffer, deleteBuffer } from '../handles/buffers.js';
import { createTexture, restoreTexture, deleteTexture } from '../handles/textures.js';
import { ReferenceMap } from '../collections/maps.js';

const types = {
    shaders: { createHandle: createShader, restoreHandle: restoreShader, deleteHandle: deleteShader },
    programs: { createHandle: createProgram, restoreHandle: restoreProgram, deleteHandle: deleteProgram },
    buffers: { createHandle: createBuffer, restoreHandle: restoreBuffer, deleteHandle: deleteBuffer },
    textures: { createHandle: createTexture, restoreHandle: restoreTexture, deleteHandle: deleteTexture },
};

class HandleMap extends ReferenceMap {
    createHandles(context, configurations) {
        for (const configuration of configurations) this.set(configuration.name, () => this.createHandle(configuration, context));
    }

    restoreHandles(context) {
        for (const [name, handle] of this) this.restoreHandle(handle, context);
    }

    deleteHandles(context, configurations) {
        for (const configuration of configurations) this.delete(configuration.name, handle => this.deleteHandle(handle, context));
    }
}

export const applyHandles = context => {
    for (const type in types) context[type] = Object.assign(new HandleMap(), types[type]);
    context.allocate = data => { for (const type in data) context[type].createHandles(context, data[type]); };
    context.deallocate = data => { for (const type in data) context[type].deleteHandles(context, data[type]); };
};

export const restoreHandles = context => { for (const type in types) context[type].restoreHandles(context); };