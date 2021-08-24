const { WebGL } = Quantum;
const { load } = quantum;

WebGL.prototype.load = async function (scene) {
    for (const [type, options] of Object.entries(scene)) {
        const handles = this.context[type];
        for (const option of options) {
            if (option.resource) {
                option.source = await load(option.resource);
            }

            handles.load(option.name, option);
        }
    }
};

WebGL.prototype.unload = function (scene) {
    for (const [type, options] of Object.entries(scene)) {
        const handles = this.context[type];
        for (const option of options) {
            handles.unload(option.name, option);
            delete option.source;
        }
    }
};