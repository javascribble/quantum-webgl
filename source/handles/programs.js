import { addVariables } from '../shaders/variables.js';

export const createProgram = (configuration, context) => {
    // TODO: Decouple from shader handle cache.
    const program = {
        vertexShader: context.shaders.get(configuration.vertexShader),
        fragmentShader: context.shaders.get(configuration.fragmentShader),
        uniforms: [...configuration.uniforms] // TODO: Deep clone?
    };

    restoreProgram(program, context);
    return program;
};

export const restoreProgram = (program, context) => {
    const handle = program.handle = context.createProgram();
    context.attachShader(handle, program.vertexShader.handle);
    context.attachShader(handle, program.fragmentShader.handle);
    context.linkProgram(handle);
    if (!context.getProgramParameter(handle, context.LINK_STATUS)) {
        throw context.getProgramInfoLog(handle);
    }

    addVariables(context, program, handle);
};

export const useProgram = (program, context) => context.useProgram(program.handle);

export const deleteProgram = (program, context) => context.deleteProgram(program.handle);