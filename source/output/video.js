import { registerSystem, defaultVideoOptions, matrix3 } from '../webgl/imports';
import { allocateHandles, deallocateHandles } from '../renderer/handles.js';
import { createSprite, spriteComponent } from '../components/sprite.js';
import { createManagedWebGLContext } from '../renderer/manager.js';
import { createWebGLRenderer } from '../renderer/renderer.js';

export const registerVideoSystem = async (options = defaultVideoOptions) => {
    const context = createManagedWebGLContext(options);
    const renderable = createWebGLRenderable(context);
    const render = createWebGLRenderer(context, renderable, options);

    // TODO: Make scene an entity rather than a component.
    registerSystem('scene', renderable, render);

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

const copy = (transform, array, index) => {
    // TODO: Only multiply the parts that have changed.
    const translation = transform.translation;
    const rotation = transform.rotation;
    const scale = transform.scale;
    const sin = Math.sin(rotation.z);
    const cos = Math.cos(rotation.z);
    array.set([cos * scale.x, sin * scale.x, 0, -sin * scale.y, cos * scale.y, 0, translation.x, translation.y, 1], index);

    // const translation = m4.create();
    // const rotation = m4.create();
    // const scale = m4.create();
    // m4.setTranslation(translation, transform.translation);
    // m4.setRotation(rotation, transform.rotation);
    // m4.setScale(scale, transform.scale);

    // const transformation = m4.create();
    // m4.multiply(translation, rotation, transformation);
    // m4.multiply(transformation, scale, transformation);

    // array.set(transformation, index);
};
