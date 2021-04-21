import { canvasOptions } from '../constants/canvas.js';
import { initializeContext } from '../context/initialize.js';

export class WebGL extends Quantum.Canvas {
    getContext() {
        const context = super.getContext('webgl2', canvasOptions) || super.getContext('webgl', canvasOptions);
        initializeContext(context);
        return context;
    }

    resize() {
        super.resize();

        this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
    }
}