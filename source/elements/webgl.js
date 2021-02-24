import { defaultCanvasOptions } from '../constants/options.js';
import { getWebGLContext } from '../graphics/context.js';
import html from '../templates/webgl.js';

const { resizeObserver } = quantum;

export class WebGL extends Quantum {
    #canvas = this.shadowRoot.querySelector('canvas');

    context = getWebGLContext(this.#canvas, defaultCanvasOptions);

    connectedCallback() {
        resizeObserver.observe(this);
    }

    disconnectedCallback() {
        resizeObserver.unobserve(this);
    }

    setResolution(width = this.#canvas.clientWidth * devicePixelRatio, height = this.#canvas.clientHeight * devicePixelRatio) {
        if (this.#canvas.width !== width) {
            this.#canvas.width = width;
        }

        if (this.#canvas.height !== height) {
            this.#canvas.height = height;
        }

        this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
    };
}

WebGL.define('quantum-webgl', html);