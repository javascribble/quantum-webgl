import { allocateHandles, deallocateHandles } from '../renderer/handles.js';
import { createSprite, spriteComponent } from '../components/sprite.js';

export const registerVideoSystem = async (options = defaultVideoOptions) => {
    const context = createManagedWebGLContext(options);
    const renderable = createWebGLRenderable(context);
    const render = createWebGLRenderer(context, renderable, options);

    const renderables = new Set();
    const updateRenderables = (deltaTime) => {
        let index = 0;
        let firstChangedRenderable = null;
        for (const renderable of renderables) {
            const transform = renderable.transform;
            if (transform.changed) {
                const buffer = renderable.buffer;
                copy(transform, buffer.data, renderable.index * matrix3.components);
                transform.changed = false;
                buffer.changed = true;

                if (index < renderables.size && !firstChangedRenderable) {
                    firstChangedRenderable = renderable;
                    buffer.offset = index;
                }

                index++;
            }
        }

        if (firstChangedRenderable) {
            //renderables.delete(firstChangedRenderable);
            //renderables.add(firstChangedRenderable);
        }
    }

    registerSystem(spriteComponent, renderables, updateRenderables);
};

const createWebGLRenderable = (context) => {
    const passes = [];
    const resources = {};
    return {
        passes,
        add(scene) {
            allocateHandles(context, resources, scene.resources);

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
        },
        delete(scene) {
            deallocateHandles(context, resources, scene.resources);
        }
    };
};

import { useProgram } from '../handles/programs.js';
import { bindBuffer, bufferData } from '../handles/buffers.js';
import { bindTexture, bufferTexture } from '../handles/textures.js';

export const createWebGLRenderer = (context, renderable) => {
    const state = {};
    return (deltaTime) => {
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
};

// export default (engine) => {
//     const transforms = new Set();
//     engine.systems.set('transform', transforms);
//     engine.updates.add({
//         update: (deltaTime) => {
//             for (const transform of transforms) {
//                 if (transform.changed) {
//                     copyTransform(transform, renderable.data);
//                     //bufferData(renderable.buffer, renderable.index, renderable.data);
//                     transform.changed = false;
//                 }
//             }
//         }
//     });
// };

const copy = (transform, array, index) => {
    // TODO: Only multiply the parts that have changed.
    const translation = transform.translation;
    const rotation = transform.rotation;
    const scale = transform.scale;
    const sin = Math.sin(rotation.z);
    const cos = Math.cos(rotation.z);
    array.set([cos * scale.x, sin * scale.x, 0, -sin * scale.y, cos * scale.y, 0, translation.x, translation.y, 1], index);
    // array.set([translation.x, translation.y, rotation.z, scale.x, scale.y, translation.z]);

    // const translation = matrix4.create();
    // const rotation = matrix4.create();
    // const scale = matrix4.create();
    // matrix4.setTranslation(translation, transform.translation);
    // matrix4.setRotation(rotation, transform.rotation);
    // matrix4.setScale(scale, transform.scale);

    // const transformation = matrix4.create();
    // matrix4.multiply(translation, rotation, transformation);
    // matrix4.multiply(transformation, scale, transformation);

    // array.set(transformation);
};