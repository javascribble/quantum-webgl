import '/node_modules/@javascribble/quantum/bundles/main-window.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main-extensions.js';
import '/node_modules/@javascribble/quantum-canvas/bundles/main-plugins.js';
import '/bundles/main.js';
import '/bundles/main-extensions.js';
import '/bundles/main-plugins.js';

const display = document.querySelector('#display');
const webgl = document.querySelector('quantum-webgl');

const { load } = quantum;
const { context } = webgl;

const path = '/test/resources/';
const resources = ['vertex.glsl', 'fragment.glsl', 'scene.json', 'image.png'];
const [vertexShader, fragmentShader, scene, image] = await Promise.all(resources.map(resource => load(path + resource)));
scene.shaders[0].source = vertexShader;
scene.shaders[1].source = fragmentShader;
scene.textures[0].data = image;

webgl.load(scene);

const program = context.programs.get('default');
const buffers = [context.buffers.get('quad'), context.buffers.get('model')];
const textures = [context.textures.get('default')];
const drawables = [{ program, buffers, textures }];
const animation = quantum.animate(({ delta }) => {
    const fps = Math.trunc(1000 / delta);

    display.innerHTML = `FPS: ${fps} Count: ${drawables.length}`;

    webgl.draw(drawables);

    if (fps > 0 && fps < 30) {
        animation.stop();
        webgl.unload(scene);
    }
});

animation.start();

document.body.style.visibility = 'visible';