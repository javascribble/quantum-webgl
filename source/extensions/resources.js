const { WebGL } = Quantum;
const { load } = quantum;

WebGL.prototype.load = async function (data) {
    for (const [type, options] of Object.entries(data)) {
        const handles = this.context[type];
        for (const option of options) {
            if (option.resource) {
                option.source = await load(option.resource);
            }

            handles.load(option.name, option);
        }
    }
};

WebGL.prototype.unload = function (data) {
    for (const [type, options] of Object.entries(data)) {
        const handles = this.context[type];
        for (const option of options) {
            handles.unload(option.name, option);
            delete option.source;
        }
    }
};