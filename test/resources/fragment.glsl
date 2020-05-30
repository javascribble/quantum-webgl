precision mediump float;

uniform sampler2D sampler0;
varying vec2 fragmentCoordinate;

void main() {
    gl_FragColor = texture2D(sampler0, fragmentCoordinate);
}