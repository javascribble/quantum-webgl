const { load: loadResource, loaders, loadText } = quantum;

loaders.glsl = loadText;

export async function load(data) {
    for (const [type, options] of Object.entries(data)) {
        const handles = this.context[type];
        for (const option of options) {
            if (option.resource) {
                option.source = await loadResource(option.resource);
            }

            handles.load(option.name, option);
        }
    }
}

export function unload(data) {
    for (const [type, options] of Object.entries(data)) {
        const handles = this.context[type];
        for (const option of options) {
            handles.unload(option.name, option);
            delete option.source;
        }
    }
}