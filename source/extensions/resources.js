import { WebGL } from '../elements/webgl.js';

WebGL.prototype.load = function (scene) {
    for (const [type, options] of Object.entries(scene)) {
        const handles = this.context[type];
        for (const option of options) {
            handles.load(option.name, option);
        }
    }
};

WebGL.prototype.unload = function (scene) {
    for (const [type, options] of Object.entries(scene)) {
        const handles = this.context[type];
        for (const option of options) {
            handles.unload(option.name, option);
        }
    }
};