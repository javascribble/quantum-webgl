import { defaultCanvasOptions } from '../constants/options.js';
import { resize, resizeObserver } from '../utilities/element.js';
import { getWebGLContext } from '../graphics/renderer.js';
import html from '../templates/webgl.js';

export class WebGL extends Quantum {
    #canvas = this.shadowRoot.querySelector('canvas');
    #context = getWebGLContext(this.#canvas, defaultCanvasOptions);

    constructor() {
        super();

        this.addEventListener('resize', event => resize(this.#canvas, this.scale || devicePixelRatio));
    }

    static get observedAttributes() { return ['scale']; }

    connectedCallback() {
        resizeObserver.observe(this);
    }

    disconnectedCallback() {
        resizeObserver.unobserve(this);
    }

    drawImage(image) {
        const { source, sx, sy, sw, sh, dx, dy, dw, dh } = image;
        //this.#context.drawImage(source, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}

WebGL.define('quantum-webgl', html);