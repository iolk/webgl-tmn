import GameState from './GameState.js'
import Terrain from './Terrain.js'
import BackgroundTexture from '../textures/Background.png'

export default (function () {

	class Background {
		constructor() {
			console.log("background")
			this.width = GameState.screen.x
			this.height = GameState.screen.y - Terrain.height
			this.color = GameState.colors.red
			this.angle = 0
			this.haveTexture = false
			this.texture = null
			this.image = null

			this.origin = {
				x: 0,
				y: 0,
			}

			this.translation = {
				x: 0,
				y: 0,
			}

			this.rotation = {
				x: 0,
				y: 1,
			}
		}

		bindTexture(gl) {
			gl.bindTexture(gl.TEXTURE_2D, this.texture)
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image)
		}

		loadImage(gl) {
			var obj = this

			this.texture = gl.createTexture()
			gl.bindTexture(gl.TEXTURE_2D, this.texture)

			this.image = new Image()
			this.image.src = BackgroundTexture

			this.image.addEventListener('load', function () {
				console.log('background image loaded')
				gl.bindTexture(gl.TEXTURE_2D, obj.texture)
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, obj.image)

				obj.haveTexture = true
			})
		}
	}

	var instance

	function createInstance() {
		var obj = new Background()
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
