import webglUtils from './vendor/webgl-utils.js'

import GameState from './GameState.js'
import VertexShader from './shaders/vertex.glsl'
import FragmentShader from './shaders/fragment.glsl'

console.log("glmanager.js")

var glm = (function () {
	class GLManager {
		constructor() {
			this.gl = null
			this.program = null
			this.locators = {}
			this.buffers = {}
			this.fps_limit = 30
		}

		setProgram() {
			// setup GLSL this.program
			this.program = webglUtils.createProgramFromSources(this.gl, [VertexShader, FragmentShader]);

			// look up where the vertex data needs to go.
			this.locators.position = this.gl.getAttribLocation(this.program, "position");
			this.locators.texcoord = this.gl.getAttribLocation(this.program, "texcoord");

			// lookup uniforms
			this.locators.resolution = this.gl.getUniformLocation(this.program, "resolution");
			this.locators.color = this.gl.getUniformLocation(this.program, "color");
			this.locators.matrix = this.gl.getUniformLocation(this.program, "matrix");
			this.locators.haveTexture = this.gl.getUniformLocation(this.program, "have_texture");
			this.locators.texture = this.gl.getUniformLocation(this.program, "texture");

			// Create a buffer to put positions in
			this.buffers.position = this.gl.createBuffer();
			this.buffers.texcoord = this.gl.createBuffer();

			this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
			this.gl.enable(this.gl.BLEND);
		}

		settings() {
			webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);
			this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
			if (!GameState.stop) {
				this.gl.clear(this.gl.COLOR_BUFFER_BIT);
				this.gl.useProgram(this.program);
				this.gl.uniform2f(this.locators.resolution, this.gl.canvas.width, this.gl.canvas.height);
			}
		}

		fpsLimit(delta) { return this.fps_limit && delta < 1000 / this.fps_limit }
	}

	var instance

	function createInstance() {
		var obj = new GLManager()
		return obj
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = createInstance()
			}
			return instance
		}
	}
})()

export default glm.getInstance()
export var gl = glm.getInstance().gl;
export var locators = glm.getInstance().locators;
export var buffers = glm.getInstance().buffers;
