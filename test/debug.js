import '/node_modules/@javascribble/quantum/bundles/main-window.js';
import '/bundles/main.js';

const display = document.querySelector('#display');
const webgl = document.querySelector('quantum-webgl');

const { load } = quantum;
const { context } = webgl;

const scene = await load('debug.json');
await webgl.load(scene);

const program = context.programs.get('default');
const buffers = [context.buffers.get('quad'), context.buffers.get('model')];
const textures = [context.textures.get('default')];
const drawables = [{ program, buffers, textures }];
const state = { drawables };

const animation = quantum.animate(({ delta }) => {
    const fps = Math.trunc(1000 / delta);

    display.innerHTML = `FPS: ${fps} Count: ${drawables.length}`;

    webgl.render(state);

    if (fps > 0 && fps < 30) {
        animation.stop();
        webgl.unload(scene);
    }
});

animation.start();

document.body.style.visibility = 'visible';