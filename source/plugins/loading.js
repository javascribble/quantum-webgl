const { loaders, loadText } = quantum;

loaders.glsl = loadText;

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