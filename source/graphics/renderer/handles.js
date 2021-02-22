import { applyShader, deleteShader } from '../handles/shaders.js';
import { applyProgram, deleteProgram } from '../handles/programs.js';
import { applyBuffer, deleteBuffer } from '../handles/buffers.js';
import { applyTexture, deleteTexture } from '../handles/textures.js';

export const allocateHandles = (context, cache, resources) => {
    applyHandles(context, cache, resources.programs, applyProgramAndShaders);
    applyHandles(context, cache, resources.buffers, applyBuffer);
    applyHandles(context, cache, resources.textures, applyTexture);
};

export const deallocateHandles = (context, cache, resources) => {
    deleteHandles(context, cache, resources.programs, deleteProgramAndShaders);
    deleteHandles(context, cache, resources.buffers, deleteBuffer);
    deleteHandles(context, cache, resources.textures, deleteTexture);
};

const applyHandles = (context, cache, resources, applicationMethod) => {
    for (const resourceName in resources) {
        if (cache.hasOwnProperty(resourceName)) {
            cache[resourceName].references++;
        } else {
            let newResource = {
                ...resources[resourceName],
                references: 1
            };

            applicationMethod(newResource, context);
            cache[resourceName] = newResource;
        }
    }
};

const deleteHandles = (context, cache, resources, deletionMethod) => {
    for (const resourceName in resources) {
        const activeResource = cache[resourceName];
        if (activeResource.references-- === 0) {
            deletionMethod(activeResource, context);
            delete cache[resourceName];
        }
    }
};

const applyProgramAndShaders = (program, context) => {
    program.vertexShader.type = context.VERTEX_SHADER;
    program.fragmentShader.type = context.FRAGMENT_SHADER;
    applyShader(program.vertexShader, context);
    applyShader(program.fragmentShader, context);
    applyProgram(program, context);
};

const deleteProgramAndShaders = (program, context) => {
    deleteShader(program.vertexShader, context);
    deleteShader(program.fragmentShader, context);
    deleteProgram(program, context);
};