import GameState from './GameState.js'
import TerrainTexture from '../textures/Terrain.png'

export default (function () {

	class Terrain {
		constructor() {
			console.log("terrain")
			this.width = GameState.screen.x
			this.height = 100
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
				y: GameState.screen.y - this.height,
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
			this.image.src = TerrainTexture

			this.image.addEventListener('load', function () {
				console.log('terrain image loaded')
				gl.bindTexture(gl.TEXTURE_2D, obj.texture)
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, obj.image)

				obj.haveTexture = true
			})
		}
	}

	var instance

	function createInstance() {
		var obj = new Terrain()
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
