import '/node_modules/@javascribble/quantum/source/main.js';
import '/node_modules/@javascribble/quantum-canvas/source/main.js';
import '/source/extensions/node.js';
import '/source/extensions/sprite.js';
import '/source/main.js';

import { Camera } from '/source/graphics/2D/camera.js';
import { draw } from '/source/renderer/draw.js';

const display = document.querySelector('#display');
const webgl = document.querySelector('quantum-webgl');
const image = document.querySelector('img');

const camera = new Camera();
camera.orthographic(10);

const { Node, Sprite, context } = webgl;
context.allocate({
    shaders: [
        {
            name: 'vertex',
            type: 'VERTEX_SHADER',
            source: document.querySelector('[type="x-shader/x-vertex"]').text
        },
        {
            name: 'fragment',
            type: 'FRAGMENT_SHADER',
            source: document.querySelector('[type="x-shader/x-fragment"]').text
        }
    ],
    programs: [
        {
            name: 'default',
            vertexShader: 'vertex',
            fragmentShader: 'fragment',
            uniforms: [
                {
                    name: 'projectionView',
                    value: camera
                },
                {
                    name: 'sampler0',
                    value: 0
                }
            ]
        }
    ],
    buffers: [
        {
            name: 'quad',
            usage: 'STATIC_DRAW',
            data: [
                -1, 1, 0.0, 1.0,
                -1, -1, 0.0, 0.0,
                1, 1, 1.0, 1.0,
                1, -1, 1.0, 0.0
            ],
            attributes: [
                {
                    name: 'vertexPosition',
                    stride: 16,
                    offset: 0,
                    components: 2
                },
                {
                    name: 'vertexCoordinate',
                    stride: 16,
                    offset: 8,
                    components: 2
                }
            ]
        },
        {
            name: 'model',
            data: [],
            attributes: [
                {
                    name: 'modelTransform',
                    stride: 36,
                    offset: 0,
                    divisor: 1,
                    components: 9
                }
            ]
        }
    ],
    textures: [
        {
            name: 'default',
            data: image
        }
    ]
});

const dynamicBuffer = context.buffers.get('model');

let count = 0;
const drawables = [];
const animation = quantum.animate(({ delta }) => {
    const fps = Math.trunc(1000 / delta);

    for (let i = 0; i < 50; i++) {
        drawables.push(new Sprite(context));
        count++;
    }

    for (const drawable of drawables) {
        const { translation, rotation, scale } = drawable;
        rotation.radians = Math.random() * Math.PI;
        translation.x = Math.random() * 20 - 10;
        translation.y = Math.random() * 20 - 10;
    }

    // TODO: Implement resizable array.
    const length = count * 9;
    if (dynamicBuffer.data.length < length) {
        const expandedBuffer = new Float32Array(length);
        for (let i = 0; i < count; i++) {
            expandedBuffer.set(drawables[i].matrix, i * 9, 9);
        }

        dynamicBuffer.data = expandedBuffer;
        dynamicBuffer.changed = true;
    }

    context.clear(context.DEPTH_BUFFER_BIT);
    camera.render(context, drawables);

    display.innerHTML = `FPS: ${fps} Count: ${count}`;

    if (fps > 0 && fps < 30) {
        animation.stop();
    }
});

animation.start();

document.body.style.visibility = 'visible';