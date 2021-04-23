import { events } from '../constants/browser.js';
import { canvasOptions } from '../constants/canvas.js';
import { applyHandles, restoreHandles } from '../context/handles.js';
import { applyConfigurations } from '../context/configuration.js';
import { applyExtensions } from '../context/extension.js';

export class WebGL extends Quantum.Canvas {
    connectedCallback() {
        addEventListener(events.contextCreationError, this.#contextCreationError);
        addEventListener(events.contextLost, this.#contextLost);
        addEventListener(events.contextRestored, this.#contextRestored);
        super.connectedCallback();
    }

    disconnectedCallback() {
        removeEventListener(events.contextCreationError, this.#contextCreationError);
        removeEventListener(events.contextLost, this.#contextLost);
        removeEventListener(events.contextRestored, this.#contextRestored);
        super.disconnectedCallback();
    }

    getContext() {
        const context = super.getContext('webgl2', canvasOptions) || super.getContext('webgl', canvasOptions);
        applyConfigurations(context);
        applyExtensions(context);
        applyHandles(context);
        return context;
    }

    resize() {
        super.resize();

        this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
    }

    #contextCreationError() { }
    #contextLost() { }
    #contextRestored() {
        // TODO: Pause rendering while context is lost.
        applyConfigurations(context);
        applyExtensions(context);
        restoreHandles(context);
    }
}