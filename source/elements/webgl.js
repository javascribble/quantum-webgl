import { addEventListeners, removeEventListeners } from '../context/browser.js';
import { applyHandles, restoreHandles } from '../context/handles.js';
import { applyConfigurations } from '../context/configuration.js';
import { applyExtensions } from '../context/extensions.js';
import { canvasOptions } from '../constants/canvas.js';
import '../plugins/loaders.js';

export class WebGL extends Quantum.Canvas {
    connectedCallback() {
        addEventListeners(this);
        super.connectedCallback();
    }

    disconnectedCallback() {
        removeEventListeners(this);
        super.disconnectedCallback();
    }

    getContext() {
        const context = super.getContext('webgl2', canvasOptions) || super.getContext('webgl', canvasOptions);
        applyConfigurations(context);
        applyExtensions(context);
        applyHandles(context);
        return context;
    }

    restore() {
        applyConfigurations(this);
        applyExtensions(this);
        restoreHandles(this);
    }

    resize() {
        super.resize();

        this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
    }
}

WebGL.define('quantum-webgl');