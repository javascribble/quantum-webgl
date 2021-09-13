import { addEventListeners, removeEventListeners } from '../context/browser.js';
import { applyConfigurations } from '../context/configuration.js';
import { applyExtensions } from '../context/extensions.js';
import { applyHandles } from '../context/handles.js';
import { canvasOptions } from '../constants/canvas.js';
import { draw } from '../renderer/draw.js';
import webgl from '../templates/webgl.js';
import '../plugins/loaders.js';

const { resizeObserver, load } = quantum;

export class WebGL extends Quantum {
    #canvas = this.shadowRoot.querySelector('canvas');
    context = this.getContext();

    constructor() {
        super();

        this.observers.add(resizeObserver);
    }

    connectedCallback() {
        addEventListeners();
        super.connectedCallback();
    }

    disconnectedCallback() {
        removeEventListeners();
        super.disconnectedCallback();
    }

    getContext() {
        const context = this.#canvas.getContext('webgl2', canvasOptions) || this.#canvas.getContext('webgl', canvasOptions);
        applyConfigurations(context);
        applyExtensions(context);
        applyHandles(context);
        return context;
    }

    resize() {
        this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
    }

    render(state) {
        draw(state, this.context);
    }

    async load(data) {
        for (const [type, options] of Object.entries(data)) {
            const handles = this.context[type];
            for (const option of options) {
                if (option.resource) {
                    option.source = await load(option.resource);
                }

                handles.load(option.name, option);
            }
        }
    }

    unload(data) {
        for (const [type, options] of Object.entries(data)) {
            const handles = this.context[type];
            for (const option of options) {
                handles.unload(option.name, option);
                delete option.source;
            }
        }
    }
}

WebGL.define('quantum-webgl', webgl);