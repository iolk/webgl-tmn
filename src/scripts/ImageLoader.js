import GLM from './GLManager.js'

import TerrainTexture from '../textures/Terrain.png'
import BackgroundTexture from '../textures/Background.png'
import ShurikenActive from '../textures/Shuriken/ShurikenActive.png'
import ShurikenStop from '../textures/Shuriken/ShurikenStop.png'
import NinjaAirLeft from '../textures/Ninja/NinjaAirLeft.png'
import NinjaAirRight from '../textures/Ninja/NinjaAirRight.png'
import NinjaJumpLeft from '../textures/Ninja/NinjaJumpLeft.png'
import NinjaJumpRight from '../textures/Ninja/NinjaJumpRight.png'
import NinjaLandedLeft from '../textures/Ninja/NinjaLandedLeft.png'
import NinjaLandedRight from '../textures/Ninja/NinjaLandedRight.png'
import NinjaLaunchLeft from '../textures/Ninja/NinjaLaunchLeft.png'
import NinjaLaunchRight from '../textures/Ninja/NinjaLaunchRight.png'
import NinjaSlidingLeft from '../textures/Ninja/NinjaSlidingLeft.png'
import NinjaSlidingRight from '../textures/Ninja/NinjaSlidingRight.png'

console.log("imageloader.js")

export default (function () {

	class ImageLoader {
		constructor() {
			this.images = new Map()
			this.textures = new Map()
			this.count = 0
		}

		load() {
			this.makeImage(TerrainTexture, "Terrain")
			this.makeImage(BackgroundTexture, "Background")

			this.makeImage(ShurikenActive, "ShurikenActive")
			this.makeImage(ShurikenStop, "ShurikenStop")

			this.makeImage(NinjaAirLeft, "NinjaAirLeft")
			this.makeImage(NinjaAirRight, "NinjaAirRight")
			this.makeImage(NinjaJumpLeft, "NinjaJumpLeft")
			this.makeImage(NinjaJumpRight, "NinjaJumpRight")
			this.makeImage(NinjaLandedLeft, "NinjaLandedLeft")
			this.makeImage(NinjaLandedRight, "NinjaLandedRight")
			this.makeImage(NinjaLaunchLeft, "NinjaLaunchLeft")
			this.makeImage(NinjaLaunchRight, "NinjaLaunchRight")
			this.makeImage(NinjaSlidingLeft, "NinjaSlidingLeft")
			this.makeImage(NinjaSlidingRight, "NinjaSlidingRight")
		}

		loaded() { return this.count == 0 }

		makeImage(texture, texture_name) {
			var il = this
			this.count++
			this.textures.set(texture_name, GLM.gl.createTexture())

			var image = new Image()
			image.src = texture

			image.addEventListener('load', function () {
				console.log(texture_name + " image loaded");
				GLM.gl.bindTexture(GLM.gl.TEXTURE_2D, il.textures.get(texture_name))
				GLM.gl.texImage2D(GLM.gl.TEXTURE_2D, 0, GLM.gl.RGBA, GLM.gl.RGBA, GLM.gl.UNSIGNED_BYTE, image)
				il.count--
			})
		}

		bindTexture(texture_name) {
			GLM.gl.bindTexture(GLM.gl.TEXTURE_2D, this.textures.get(texture_name))
			//var img = this.images.get(texture_name)
			//GLM.gl.texImage2D(GLM.gl.TEXTURE_2D, 0, GLM.gl.RGBA, GLM.gl.RGBA, GLM.gl.UNSIGNED_BYTE, img)
		}
	}

	var instance

	function createInstance() {
		var obj = new ImageLoader()
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
})().getInstance()
