import { useProgram } from '../handles/programs.js';
import { bindBuffer } from '../handles/buffers.js';
import { bindTexture } from '../handles/textures.js';

export const bind = (context, program, buffers, textures) => {
    useProgram(program, context);
    context.program = program;

    for (const buffer of buffers) {
        bindBuffer(buffer, context);
        for (const attribute of buffer.attributes) {
            program[attribute.name](attribute);
        }
    }

    for (const texture of textures) {
        texture.unit = 0;// TODO: Determine available texture slot.
        bindTexture(texture, context);
    }
};