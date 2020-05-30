uniform mat3 projectionView;
attribute mat3 modelTransform;
attribute vec2 vertexPosition; 
attribute vec2 vertexCoordinate; 
varying vec2 fragmentCoordinate; 

void main() { 
    gl_Position = vec4((projectionView * modelTransform * vec3(vertexPosition, 1)).xy, 0, 1);

    fragmentCoordinate = vertexCoordinate;
}