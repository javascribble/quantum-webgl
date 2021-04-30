import { WebGL } from '../elements/webgl.js';
import { useProgram } from '../handles/programs.js';
import { bindBuffer, bufferData } from '../handles/buffers.js';
import { bindTexture, bufferTexture } from '../handles/textures.js';
import { Matrix3 } from '../graphics/matrix3.js';

WebGL.prototype.Sprite = class Sprite {
    constructor(context) {
        const modelBuffer = context.buffers.get('model');
        if (!modelBuffer.data) {
            modelBuffer.data = new Matrix3();
            modelBuffer.changed = true;
        }

        this.program = context.programs.get('default');
        this.buffers = [context.buffers.get('quad'), modelBuffer];
        this.textures = [context.textures.get('default')];
    }

    draw(context) {
        const { program, buffers, textures } = this;
        if (context.program !== program) {
            useProgram(program, context);
            context.program = program;
            context.bind = true;
        }

        for (const uniform of program.uniforms) {
            if (context.bind || uniform.changed) {
                program[uniform.name](uniform.value?.array || uniform.value);
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

        if (context.bind) {
            for (const texture of textures) {
                texture.unit = 0;// TODO: Determine available texture slot.
                bindTexture(texture, context);
                if (texture.changed) {
                    bufferTexture(texture, context);
                    texture.changed = false;
                }
            }

            context.bind = false;
        }

        context.drawArraysInstanced(context.TRIANGLE_STRIP, 0, 4, 1);
    }
};