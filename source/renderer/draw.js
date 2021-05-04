import { useProgram } from '../handles/programs.js';
import { bindBuffer, bufferData } from '../handles/buffers.js';
import { bindTexture, bufferTexture } from '../handles/textures.js';

export const draw = (context, drawables, state = {}) => {
    for (const { program, buffers, textures } of drawables) {
        if (state.program !== program) {
            useProgram(program, context);
            state.program = program;
            state.bind = true;
        }

        for (const uniform of program.uniforms) {
            if (state.bind || uniform.changed) {
                program[uniform.name](uniform.value);
                uniform.changed = false;
            }
        }

        for (const buffer of buffers) {
            if (state.bind) {
                bindBuffer(buffer, context);
                for (const attribute of buffer.attributes) {
                    program[attribute.name](attribute);
                }
            }

            if (buffer.changed) {
                bufferData(buffer, context);
            }
        }

        for (const texture of textures) {
            if (state.bind) {
                texture.unit = 0;// TODO: Determine available texture slot.
                bindTexture(texture, context);
            }

            if (texture.changed) {
                bufferTexture(texture, context);
            }
        }

        state.bind = false;
        //context.drawArrays(mode, offset, count);
        //context.drawElements(mode, count, type, offset);
        context.drawArraysInstanced(context.TRIANGLE_STRIP, 0, 4, drawables.length);
        //context.drawElementsInstanced(mode, count, type, offset, instances);
    }
};