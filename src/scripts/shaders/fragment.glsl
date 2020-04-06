precision mediump float;
uniform vec4 color;
uniform sampler2D texture;

// Passed in from the vertex shader.
varying vec2 v_texcoord;

uniform bool have_texture;

void main() {
	if(have_texture){
		gl_FragColor = texture2D(texture, v_texcoord);
	}else{
		gl_FragColor = color;
	}
}
