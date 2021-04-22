import '/node_modules/@javascribble/quantum/source/main.js';
import '/node_modules/@javascribble/quantum-canvas/source/main.js';
import '/source/extensions/node.js';
import '/source/extensions/sprite.js';
import '/source/main.js';

const display = document.querySelector('#display');
const webgl = document.querySelector('quantum-webgl');
const image = document.querySelector('img');

webgl.context.allocate({
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
                    name: 'projectionView'
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
            usage: 'DYNAMIC_DRAW',
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

const { Node, Sprite } = webgl;

let count = 0;
const root = new Node();
const sprite = new Sprite(image);
const animation = quantum.animate(({ delta }) => {
    const fps = Math.trunc(1000 / delta);

    for (let i = 0; i < 10; i++) {
        const node = new Node();
        node.drawables.push(sprite);
        root.children.push(node);
        count++;
    }

    for (const { transform } of root.children) {
        const { translation, rotation, scale } = transform;
        rotation.z = Math.random() * Math.PI;
        translation.x = (translation.x + Math.random() * 10) % webgl.clientWidth;
        translation.y = (translation.y + Math.random() * 10) % webgl.clientHeight;
    }

    root.draw(webgl.context);

    display.innerHTML = `FPS: ${fps} Count: ${count}`;

    if (fps < 30) {
        animation.stop();
    }
});

animation.start();

document.body.style.visibility = 'visible';