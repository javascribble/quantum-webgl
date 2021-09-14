export function resize() {
    const { scale, context } = this;
    const { canvas } = context;

    const { clientWidth, clientHeight } = canvas;
    canvas.width = clientWidth * scale;
    canvas.height = clientHeight * scale;

    const { drawingBufferWidth, drawingBufferHeight } = context;
    context.viewport(0, 0, drawingBufferWidth, drawingBufferHeight);
}