import { WebGL } from '../elements/webgl.js';
import { useProgram } from '../handles/programs.js';
import { bindBuffer, bufferData } from '../handles/buffers.js';
import { bindTexture, bufferTexture } from '../handles/textures.js';

WebGL.prototype.Node = class Node {
    drawables = [];
    children = [];

    transform = {
        translation: { x: 0, y: 0 },
        rotation: { z: 0 },
        scale: { x: 1, y: 1 }
    };

    draw(context) {
        // context.save();

        //const { translation, rotation, scale } = this.transform;
        // const sin = Math.sin(rotation.z);
        // const cos = Math.cos(rotation.z);
        // context.transform(cos * scale.x, sin * scale.x, -sin * scale.y, cos * scale.y, translation.x, translation.y);

        for (const { program, buffers, textures } of this.drawables) {
            if (context.program !== program) {
                useProgram(program, context);
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

        for (const child of this.children) {
            child.draw(context);
        }

        // context.restore();
    }
};