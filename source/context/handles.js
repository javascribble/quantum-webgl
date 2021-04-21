import { restoreShader } from '../refactor/handles/shaders.js';
import { restoreProgram } from '../refactor/handles/programs.js';
import { restoreBuffer } from '../refactor/handles/buffers.js';
import { restoreTexture } from '../refactor/handles/textures.js';

export const createHandles = context => {
    context.shaders = new Set();
    context.programs = new Set();
    context.buffers = new Set();
    context.textures = new Set();
};

export const restoreHandles = context => {
    context.shaders.forEach(shader => restoreShader(shader, context));
    context.programs.forEach(program => restoreProgram(program, context));
    context.buffers.forEach(buffer => restoreBuffer(buffer, context));
    context.textures.forEach(texture => restoreTexture(texture, context));
};