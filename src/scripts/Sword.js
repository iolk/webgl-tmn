import GameState from './GameState.js'
import Player from './Player.js'
import Terrain from './Terrain.js'

export default (function () {
	class Sword {
		constructor() {/**
			 * 0 - resting
			 * 1 - left-bottom
			 * 2 - left
			 * 3 - left-up
			 * 4 - right-bottom
			 * 5 - right
			 * 6 - right-up
			 * 7 - up
			 * 8 - middle
			 * 9 - middle2
			 * 9 - resting2
			 */

			// Sizes based on textures
			this.sizes = [];
			this.sizes[0] = { w: 40, h: 4, off_x: -39, off_y: 14, angle: 0 }
			this.sizes[1] = { w: 40, h: 4, off_x: -50, off_y: 10, angle: 45 }
			this.sizes[2] = { w: 40, h: 4, off_x: -45, off_y: -5, angle: 0 }
			this.sizes[3] = { w: 40, h: 4, off_x: -46, off_y: -23, angle: -25 }
			this.sizes[4] = { w: 40, h: 4, off_x: 44, off_y: 14, angle: -25 }
			this.sizes[5] = { w: 40, h: 4, off_x: 42, off_y: 1, angle: 0 }
			this.sizes[6] = { w: 40, h: 4, off_x: 44, off_y: -20, angle: 25 }
			this.sizes[7] = { w: 40, h: 4, off_x: 5, off_y: -16, angle: 25 }
			this.sizes[8] = { w: 30, h: 4, off_x: -10, off_y: -24, angle: 45 }
			this.sizes[9] = { w: 40, h: 4, off_x: -6, off_y: -2, angle: -10 }
			this.sizes[10] = { w: 45, h: 4, off_x: -39, off_y: 6, angle: -5 }

			// General settings
			this.width = 40
			this.height = 4
			this.color = [255, 0, 255, 1]
			this.angle = 0
			this.have_texture = false

			this.resting = {
				x: 20,
				y: -20,
			}

			this.origin = {
				x: -20,
				y: -2,
			}

			this.translation = {
				x: 0,
				y: 0,
			}
		}

		setSize() {
			var state = this.state()
			this.width = this.sizes[state].w
			this.height = this.sizes[state].h
			this.angle = this.sizes[state].angle
			this.translation.x = GameState.screen.x / 2 + this.sizes[state].off_x
			this.translation.y = GameState.screen.y - Terrain.height - this.height / 2 - Player.height / 2 + this.sizes[state].off_y
		}

		update() {
			this.setSize()
		}

		state() {
			/**
			 * 0 - resting
			 * 1 - left-bottom
			 * 2 - left
			 * 3 - left-up
			 * 4 - right-bottom
			 * 5 - right
			 * 6 - right-up
			 * 7 - up
			 * 8 - middle
			 * 9 - middle2
			 */
			if (GameState.keys.left && GameState.keys.right) return 8;
			if (GameState.keys.left || GameState.keys.right) {
				var state = GameState.keys.left ? 2 : 0 + GameState.keys.right ? 5 : 0;
				return state + (GameState.keys.up ? 1 : 0) - (GameState.keys.bottom ? 1 : 0);
			} else {
				return (GameState.keys.up || GameState.keys.bottom) ? 7 : 0;
			}
		}
	}

	var instance;

	function createInstance() {
		var obj = new Sword();
		return obj;
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	};
})().getInstance()

