uniform mat3 projectionView;
attribute vec3 spriteTranslation;
attribute float spriteRotation;
attribute vec2 spriteScale;
attribute vec2 vertexPosition; 
attribute vec2 vertexCoordinate; 
varying vec2 fragmentCoordinate; 

void main() { 
	float cosine = cos(spriteRotation);
	float sine = sin(spriteRotation);
    vec2 scaledPosition = vertexPosition * spriteScale;
    vec2 rotatedPosition = vec2(scaledPosition.x * cosine + scaledPosition.y * sine, scaledPosition.y * cosine - scaledPosition.x * sine);
    vec3 translatedPosition = vec3(rotatedPosition, 1) + spriteTranslation;
    gl_Position = vec4(projectionView * translatedPosition, 1);
    fragmentCoordinate = vertexCoordinate;
}