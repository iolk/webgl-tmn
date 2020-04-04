precision mediump float;
uniform vec4 color;

// Passed in from the vertex shader.
varying vec2 v_texcoord;

// The texture.
uniform sampler2D texture;

void main() {
	//texture2D(texture, v_texcoord);
	//color;
	//color[0] = v_texcoord[0];
	gl_FragColor = color;
}
