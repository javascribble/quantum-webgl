import { WebGL } from '../elements/webgl.js';
import { Matrix3 } from '../graphics/matrix3.js';
import { Transform } from '../graphics/2D/transform.js';
import { useProgram } from '../handles/programs.js';
import { bindBuffer, bufferData } from '../handles/buffers.js';
import { bindTexture, bufferTexture } from '../handles/textures.js';

WebGL.prototype.Sprite = class Sprite extends Transform {
    matrix = new Matrix3();

    constructor(context) {
        this.program = context.programs.get('default');
        this.buffers = [context.buffers.get('quad'), modelBuffer];
        this.textures = [context.textures.get('default')];
    }

    draw(context, state = {}) {
        const { program, buffers, textures } = this;
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
                buffer.changed = false;
            }
        }

        for (const texture of textures) {
            if (state.bind) {
                texture.unit = 0;// TODO: Determine available texture slot.
                bindTexture(texture, context);
            }

            if (texture.changed) {
                bufferTexture(texture, context);
                texture.changed = false;
            }
        }

        state.bind = false;
        context.drawArraysInstanced(context.TRIANGLE_STRIP, 0, 4, 1);
    }
};