export const loadImage = async (resource) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = resource;
    });
};

export const loadScene = async (resource) => {
    const scene = await loadResource(resource);

    const resources = scene.resources;
    resources.programs = await loadResources(resources.programs, loadProgram);
    resources.buffers = await loadResources(resources.buffers, loadBuffer);
    resources.textures = await loadResources(resources.textures, loadTexture);

    return scene;
};

const loadProgram = async (resource) => {
    const programResource = await loadResource(resource);

    programResource.vertexShader = {
        source: await loadResource(programResource.vertexShader)
    };

    programResource.fragmentShader = {
        source: await loadResource(programResource.fragmentShader)
    };

    return programResource;
};

const loadBuffer = async (resource) => {
    const bufferResource = await loadResource(resource);
    bufferResource.data = new Float32Array(bufferResource.data);
    return bufferResource;
};

const loadTexture = async (resource) => {
    const textureResource = await loadResource(resource);
    textureResource.data = await loadResource(textureResource.data);
    return textureResource;
};