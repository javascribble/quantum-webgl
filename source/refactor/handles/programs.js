import { addVariables } from '../shaders/variables.js';

export const createProgram = (context, vertexShader, fragmentShader) => {
    const program = {
        vertexShader,
        fragmentShader
    };

    applyProgram(program, context);
    return program;
};

export const applyProgram = (program, context) => {
    restoreProgram(program, context);
    context.programs.add(program);
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

export const deleteProgram = (program, context) => {
    context.programs.delete(program);
    context.deleteProgram(program.handle);
};