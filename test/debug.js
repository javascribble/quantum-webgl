import '/node_modules/@javascribble/quantum/source/main.js';
import '/node_modules/@javascribble/quantum-canvas/source/main.js';
import '/source/extensions/2D.js';
import '/source/main.js';

import { draw } from '/source/renderer/draw.js';

const display = document.querySelector('#display');
const webgl = document.querySelector('quantum-webgl');
const image = document.querySelector('img');
const { Camera, Sprite, context } = webgl;

const size = 10;
const camera = new Camera();
camera.projection.size = size;

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
                    gl_Position = vec4(projectionView * modelTransform * vec3(vertexPosition, 1), 1);

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
                    value: camera.matrix
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
const buffer = new Float32Array(300000); // TODO: Resize.

const program = context.programs.get('default');
const buffers = [context.buffers.get('quad'), context.buffers.get('model')];
const textures = [context.textures.get('default')];

const drawables = [];
const animation = quantum.animate(({ delta }) => {
    const fps = Math.trunc(1000 / delta);

    for (let i = 0; i < 300; i++) {
        drawables.push(new Sprite(program, buffers, textures));
    }

    for (let i = 0; i < drawables.length; i++) {
        const drawable = drawables[i];
        const { translation, rotation, scale } = drawable;
        translation.x = Math.random() * size * 2 - size;
        translation.y = Math.random() * size * 2 - size;
        buffer.set(drawable.matrix, i * 9);
    }

    dynamicBuffer.changed = true;
    dynamicBuffer.data = buffer.subarray(0, drawables.length * 9);

    draw(context, drawables);

    display.innerHTML = `FPS: ${fps} Count: ${drawables.length}`;

    if (fps > 0 && fps < 30) {
        animation.stop();
    }
});

animation.start();

document.body.style.visibility = 'visible';