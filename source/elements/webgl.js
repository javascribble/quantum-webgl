import { extensionNames } from '../constants/options.js';

export class WebGL extends Quantum.Canvas {
    getContext(options) {
        const context = super.getContext('webgl2', options) || super.getContext('webgl', options);
        context.enable(context.DEPTH_TEST);
        context.enable(context.BLEND);
        context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA);
        context.pixelStorei(context.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);

        for (const extensionName of extensionNames) {
            const vendorName = extensionName.substring(0, extensionName.indexOf('_'));
            const extension = context.getExtension(extensionName);
            for (const member in extension) {
                const isConstant = member.includes('_');
                const propertyName = member.substring(0, member.indexOf(vendorName) - (isConstant ? 1 : 0));
                context[propertyName] = isConstant ? extension[member] : extension[member].bind(extension);
            }
        }

        return context;
    }

    clear(mask = context.DEPTH_BUFFER_BIT) {
        this.context.clear(mask);
    }

    resize() {
        super.resize();

        this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
    }
}