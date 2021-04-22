import { WebGL } from '../elements/webgl.js';

WebGL.prototype.Node = class Node {
    drawables = [];
    children = [];

    transform = {
        translation: { x: 0, y: 0 },
        rotation: { z: 0 },
        scale: { x: 1, y: 1 }
    };

    render(context) {
        scene.resources.programs.defaultProgram.uniforms[0].value = matrix3.orthographic();

        // TODO: Make this more flexible.
        const buffer = resources.dynamicBuffer;
        const entities = scene.entities;
        const count = entities.length;

        // TODO: This also needs to be resized when an entity (not a scene) is deleted.
        const resizedBuffer = new Float32Array((buffer.data.size || 0) + matrix3.components * count);
        resizedBuffer.set(buffer.data)
        buffer.data = resizedBuffer;
        buffer.changed = true;

        // TODO: This is hardcoded and should be replaced with a strategy that figures out render passes.
        passes.push({
            program: resources.defaultProgram,
            buffers: [
                resources.staticBuffer,
                resources.dynamicBuffer
            ],
            textures: [resources.defaultTexture],
            draw: () => context.drawArraysInstanced(context.TRIANGLE_STRIP, 0, 4, count)
        });

        for (let i = 0; i < count; i++) {
            const entity = entities[i];
            entity.sprite = createSprite(entity.transform, resources.dynamicBuffer, i);
        }

        context.clear(context.DEPTH_BUFFER_BIT);
        for (const pass of renderable.passes) {
            const program = pass.program;
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

            for (const buffer of pass.buffers) {
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

            if (state.bind) {
                for (const texture of pass.textures) {
                    texture.unit = 0;// TODO: Put this in the right place.
                    bindTexture(texture, context);
                    if (texture.changed) {
                        bufferTexture(texture, context);
                        texture.changed = false;
                    }
                }
            }

            state.bind = false;
            pass.draw();
        }
    }

    draw(context) {
        const { translation, rotation, scale } = this.transform;

        // context.save();

        // const sin = Math.sin(rotation.z);
        // const cos = Math.cos(rotation.z);
        // context.transform(cos * scale.x, sin * scale.x, -sin * scale.y, cos * scale.y, translation.x, translation.y);

        // for (const drawable of this.drawables) {
        //     drawable.draw(context);
        // }

        // for (const child of this.children) {
        //     child.draw(context);
        // }

        // context.restore();
    }
};