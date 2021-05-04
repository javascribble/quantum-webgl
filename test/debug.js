import '/node_modules/@javascribble/quantum/source/main.js';
import '/node_modules/@javascribble/quantum-canvas/source/main.js';
import '/source/extensions/node.js';
import '/source/extensions/sprite.js';
import '/source/main.js';

import { Camera } from '/source/graphics/2D/camera.js';

const display = document.querySelector('#display');
const webgl = document.querySelector('quantum-webgl');
const image = document.querySelector('img');

const size = 100;
const camera = new Camera();
camera.orthographic(size);

const { Node, Sprite, context } = webgl;
context.allocate({
    shaders: [
        {
            name: 'vertex',
            type: 'VERTEX_SHADER',
            source: `                    
                uniform mat3 projectionView;
                attribute mat3 modelTransform;
                attribute vec2 vertexPosition;
                attribute vec2 vertexCoordinate;
                varying vec2 fragmentCoordinate;

                void main() {
                    gl_Position = vec4((projectionView * modelTransform * vec3(vertexPosition, 1)), 1);

                    fragmentCoordinate = vertexCoordinate;
                }`
        },
        {
            name: 'fragment',
            type: 'FRAGMENT_SHADER',
            source: `                    
                precision mediump float;

                uniform sampler2D sampler0;
                varying vec2 fragmentCoordinate;

                void main() {
                    gl_FragColor = texture2D(sampler0, fragmentCoordinate);
                }`
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

// TODO: Implement resizable array.
const count = 1500;
const drawables = [];
const length = count * 9;
const buffer = new Float32Array(length);

const dynamicBuffer = context.buffers.get('model');
dynamicBuffer.data = buffer;
dynamicBuffer.changed = true;

for (let i = 0; i < count; i++) {
    const sprite = new Sprite(context);
    sprite.connect(buffer, i * 9);
    drawables.push(sprite);
}

const animation = quantum.animate(({ delta }) => {
    const fps = Math.trunc(1000 / delta);

    dynamicBuffer.changed = true;
    for (const drawable of drawables) {
        const { translation } = drawable;
        translation.x = Math.random() * size * 2 - size;
        translation.y = Math.random() * size * 2 - size;
        drawable.update();
    }

    camera.render(context, drawables);

    display.innerHTML = `FPS: ${fps} Count: ${count}`;

    if (fps > 0 && fps < 30) {
        animation.stop();
    }
});

animation.start();

document.body.style.visibility = 'visible';