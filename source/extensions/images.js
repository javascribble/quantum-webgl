import { WebGL } from '../elements/webgl.js';

WebGL.prototype.drawImage = function (data) {
};

WebGL.prototype.drawImageTree = function (data) {
    if (!data.hidden) {
        // TODO: TRS

        if (data.image) {
            this.drawImage(data);
        }

        if (data.children?.length) {
            for (const child of data.children) {
                this.drawImageTree(child);
            }
        }
    }
};