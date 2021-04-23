import { WebGL } from '../elements/webgl.js';

WebGL.prototype.Sprite = class Sprite {
    constructor(context) {
        this.program = context.programs.get('default');

        this.buffers = [
            context.buffers.get('quad'),
            context.buffers.get('model')
        ];

        this.textures = [
            context.textures.get('default')
        ];
    }

    draw(context) {
        const { image, sx, sy, sw, sh, dx, dy, dw, dh } = this;
        //context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
};