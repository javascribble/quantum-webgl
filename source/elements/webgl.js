import { canvasOptions, extensionOptions } from '../constants/options.js';

export class WebGL extends Quantum.Canvas {
    getContext() {
        const context = super.getContext('webgl2', canvasOptions) || super.getContext('webgl', canvasOptions);
        context.enable(context.DEPTH_TEST);
        context.enable(context.BLEND);
        context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA);
        context.pixelStorei(context.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);

        for (const extensionOption of extensionOptions) {
            const vendorName = extensionOption.substring(0, extensionOption.indexOf('_'));
            const extension = context.getExtension(extensionOption);
            for (const member in extension) {
                const isConstant = member.includes('_');
                const propertyName = member.substring(0, member.indexOf(vendorName) - (isConstant ? 1 : 0));
                context[propertyName] = isConstant ? extension[member] : extension[member].bind(extension);
            }
        }

        return context;
    }

    resize() {
        super.resize();

        this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
    }
}