import { configurationOptions } from '../constants/context.js';

export const applyConfigurations = context => {
    for (const configurationOption of configurationOptions) {
        context.enable(context[configurationOption]);
    }

    // TODO: Make these flexible.
    context.pixelStorei(context.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);

    context.enable(context.DEPTH_TEST);
    context.depthFunc(context.LEQUAL);

    context.enable(context.BLEND);
    context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA);
};