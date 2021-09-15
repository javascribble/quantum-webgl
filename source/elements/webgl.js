import { initialize } from '../context/canvas.js';
import { load, unload } from '../context/resources.js';
import { resize } from '../context/viewport.js';
import { render } from '../renderer/render.js';
import webgl from '../templates/webgl.js';
import '../context/browser.js';

const { resizeObserver } = quantum;

export class WebGL extends Quantum {
    #canvas = this.shadowRoot.querySelector('canvas');
    context = initialize(this.#canvas);
    scale = devicePixelRatio;

    constructor() {
        super();

        this.observers.add(resizeObserver);
    }

    load = load;
    unload = unload;
    resize = resize;
    render = render;
}

WebGL.define('quantum-webgl', webgl);