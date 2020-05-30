import { start, stop, addListener } from '../imports.js';
import { restoreShader } from '../handles/shaders.js';
import { restoreProgram } from '../handles/programs.js';
import { restoreBuffer } from '../handles/buffers.js';
import { restoreTexture } from '../handles/textures.js';
import { createWebGLContext, applyOptionsAndExtensions } from './context.js';

const contexts = new Map();

export const createManagedWebGLContext = (options) => {
    const context = createWebGLContext(options);
    context.shaders = new Set();
    context.programs = new Set();
    context.buffers = new Set();
    context.textures = new Set();
    contexts.set(context);
    return context;
};

const contextLost = () => stop();

const contextRestored = () => {
    for (const context of contexts) {
        applyOptionsAndExtensions(context);
        context.shaders.forEach(shader => restoreShader(shader, context));
        context.programs.forEach(program => restoreProgram(program, context));
        context.buffers.forEach(buffer => restoreBuffer(buffer, context));
        context.textures.forEach(texture => restoreTexture(texture, context));
    }

    start();
};

const contextCreationError = () => {
};

addListener('webglcontextlostevent', contextLost);
addListener('webglcontextrestored', contextRestored);
addListener('webglcontextcreationerror', contextCreationError);