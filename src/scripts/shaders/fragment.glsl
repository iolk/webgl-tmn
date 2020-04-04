precision mediump float;
uniform vec4 color;
uniform sampler2D texture;

// Passed in from the vertex shader.
varying vec2 v_texcoord;

void main() {
	//texture2D(texture, v_texcoord);
	//color;
	//color[0] = v_texcoord[0];
	gl_FragColor = vec4(v_texcoord.x,color.gba);
}
