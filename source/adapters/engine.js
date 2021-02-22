import { WebGL } from '../elements/webgl.js';

WebGL.prototype.adapt = function (api) {
    api.drawImage = this.drawImage.bind(this);
    api.drawImageTree = this.drawImageTree.bind(this);
};