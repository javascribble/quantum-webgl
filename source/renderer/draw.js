import { useProgram } from '../handles/programs.js';
import { bindBuffer, bufferData } from '../handles/buffers.js';
import { bindTexture, bufferTexture } from '../handles/textures.js';

export const draw = (context, drawables) => {
    for (const { program, buffers, textures } of drawables) {
        if (context.program !== program) {
            useProgram(program, context); // Draw between batches.
            context.program = program;
            context.bind = true;
        }

        for (const uniform of program.uniforms) {
            if (context.bind || uniform.changed) {
                program[uniform.name](uniform.value);
                uniform.changed = false;
            }
        }

        for (const buffer of buffers) {
            if (context.bind) {
                bindBuffer(buffer, context);
                for (const attribute of buffer.attributes) {
                    program[attribute.name](attribute);
                }
            }

            if (buffer.changed) {
                bufferData(buffer, context);
                buffer.changed = false;
            }
        }

        for (const texture of textures) {
            if (context.bind) {
                texture.unit = 0;// TODO: Determine available texture slot.
                bindTexture(texture, context);
            }

            if (texture.changed) {
                bufferTexture(texture, context);
                texture.changed = false;
            }
        }

        context.bind = false;
    }

    //context.drawArrays(mode, offset, count);
    //context.drawElements(mode, count, type, offset);
    context.drawArraysInstanced(context.TRIANGLE_STRIP, 0, 4, drawables.length);
    //context.drawElementsInstanced(mode, count, type, offset, instances);
};