import '/node_modules/@javascribble/quantum/source/main.js';
import '/node_modules/@javascribble/quantum-canvas/source/main.js';
import '/source/extensions/images.js';
import '/source/utilities/loaders.js';
import '/source/main.js';

const webgl = document.querySelector('quantum-webgl');
const image = document.querySelector('img');

const sprite = {
    image,
    sx: 0,
    sy: 0,
    sw: image.width,
    sh: image.height,
    dx: -image.width / 2,
    dy: -image.width / 2,
    dw: image.width,
    dh: image.height
};

const clone1 = {
    ...sprite,
    position: { x: 200, y: 200 },
    rotation: 0,
    scale: { x: 1, y: 1 }
};

const clone2 = {
    ...sprite,
    position: { x: 100, y: 100 },
    rotation: 0,
    scale: { x: 1, y: 1 }
};

clone1.children = [clone2];

quantum.animate(time => {
    const radians = time.delta * 0.05 % 360 * Math.PI / 180;
    clone1.rotation += radians;
    clone2.rotation += radians;
    webgl.drawImageTree(clone1);
}).start();

document.body.style.visibility = 'visible';