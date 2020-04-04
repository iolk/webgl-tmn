import GameState from "./GameState.js"
import Utils from "./Utils.js"
import BackgroundTexture from "../textures/Background.png";

export default class Rectangle {
	constructor() {
		this.height = 100
		this.width = 100
		this.color = [Math.random(), Math.random(), Math.random(), 1]
		this.angle = 0
		this.texture = null;

		this.origin = {
			x: 0,
			y: 0,
		}

		this.translation = {
			x: 0,
			y: 0,
		}
	}

	loadTexture(gl) {
		// Create a texture.
		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);

		// Fill the texture with a 1x1 blue pixel.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
			new Uint8Array([0, 0, 255, 255]));

		//Asynchronously load an image
		var image = new Image();
		var obj = this
		image.src = BackgroundTexture;
		image.addEventListener('load', function () {
			// Now that the image has loaded make copy it to the texture.
			gl.bindTexture(gl.TEXTURE_2D, obj.texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
			// Check if the image is a power of 2 in both dimensions.
			if (Utils.isPowerOf2(image.width) && Utils.isPowerOf2(image.height)) {
				// Yes, it's a power of 2. Generate mips.
				gl.generateMipmap(gl.TEXTURE_2D);
			} else {
				// No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			}
		});
	}
}
