import '/node_modules/@javascribble/quantum/source/main.js';
import '/node_modules/@javascribble/quantum-canvas/source/main.js';
import '/source/extensions/node.js';
import '/source/extensions/sprite.js';
import '/source/main.js';

const display = document.querySelector('#display');
const webgl = document.querySelector('quantum-webgl');
const image = document.querySelector('img');

const vertexShader = `                    
    uniform mat3 projectionView;
    attribute mat3 modelTransform;
    attribute vec2 vertexPosition;
    attribute vec2 vertexCoordinate;
    varying vec2 fragmentCoordinate;

    void main() {
        gl_Position = vec4((projectionView * modelTransform * vec3(vertexPosition, 1)).xy, 0, 1);

        fragmentCoordinate = vertexCoordinate;
    }
`;

const fragmentShader = `
    precision mediump float;

    uniform sampler2D sampler0;
    varying vec2 fragmentCoordinate;

    void main() {
        gl_FragColor = texture2D(sampler0, fragmentCoordinate);
    }
`;

const program = {
    "vertexShader": "vertex.glsl",
    "fragmentShader": "fragment.glsl",
    "uniforms": [
        {
            "name": "projectionView"
        },
        {
            "name": "sampler0",
            "value": 0
        }
    ]
};

const staticBuffer = {
    "data": [
        -1, 1, 0.0, 1.0,
        -1, -1, 0.0, 0.0,
        1, 1, 1.0, 1.0,
        1, -1, 1.0, 0.0
    ],
    "attributes": [
        {
            "name": "vertexPosition",
            "stride": 16,
            "offset": 0,
            "components": 2
        },
        {
            "name": "vertexCoordinate",
            "stride": 16,
            "offset": 8,
            "components": 2
        }
    ]
};

const dynamicBuffer = {
    "usage": "DYNAMIC_DRAW",
    "attributes": [
        {
            "name": "modelTransform",
            "stride": 36,
            "offset": 0,
            "divisor": 1,
            "components": 9
        }
    ]
};

const texture = {
    "data": "image.png"
};

const { Node, Sprite } = webgl;

let count = 0;
const root = new Node();
const sprite = new Sprite(image);
const animation = quantum.animate(({ delta, elapsed }) => {
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