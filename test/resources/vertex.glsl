uniform mat4 projectionView;
attribute mat4 modelTransform;
attribute vec4 vertexPosition;
attribute vec2 vertexCoordinate;
varying vec2 fragmentCoordinate;

void main() {
    gl_Position = projectionView * modelTransform * vertexPosition;

    fragmentCoordinate = vertexCoordinate;
}