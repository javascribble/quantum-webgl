import { applyOptionsAndExtensions } from '../graphics/renderer/context.js';
import html from '../templates/webgl.js';

export class WebGL extends Quantum.Canvas {
    getContext() {
        const context = super.getContext('webgl2') || super.getContext('webgl');
        applyOptionsAndExtensions(context);
        return context;
    }

    setResolution(width, height) {
        super.setResolution(width, height);

        this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
    };
}

WebGL.define('quantum-webgl', html);