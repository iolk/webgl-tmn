import GameState from './GameState.js'
import Terrain from './Terrain.js'
import Sword from './Sword.js'

export default (function () {

	class Player {

		constructor() {
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
			 * 9 - resting2
			 */
			this.state = 0

			// Sizes based on textures
			this.sizes = [];
			this.sizes[0] = { w: 94, h: 64, off: -12 }
			this.sizes[1] = { w: 98, h: 68, off: -16 }
			this.sizes[2] = { w: 98, h: 66, off: -16 }
			this.sizes[3] = { w: 96, h: 72, off: -16 }
			this.sizes[4] = { w: 98, h: 66, off: 13 }
			this.sizes[5] = { w: 98, h: 66, off: 13 }
			this.sizes[6] = { w: 98, h: 68, off: 13 }
			this.sizes[7] = { w: 68, h: 58, off: 0 }
			this.sizes[8] = { w: 70, h: 66, off: 0 }
			this.sizes[9] = { w: 70, h: 68, off: 0 }
			this.sizes[10] = { w: 96, h: 64, off: -12 }

			// General settings
			this.width = 60
			this.height = 100
			this.color = GameState.colors.blue
			this.state = null
			this.angle = 0
			this.have_texture = true

			this.origin = {
				x: 0,
				y: 0,
			}

			this.translation = {
				x: GameState.screen.x / 2 - this.width / 2,
				y: GameState.screen.y - Terrain.height - this.height,
			}
		}

		update() {
			this.state = Sword.state()
			this.setSize()
		}

		setSize() {
			this.width = this.sizes[this.state].w
			this.height = this.sizes[this.state].h
			// If touch the terrain lands
			this.translation.x = GameState.screen.x / 2 - this.width / 2 + this.sizes[this.state].off
			this.translation.y = GameState.screen.y - Terrain.height - this.height
		}

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
		getTextureName() {
			var action = "Samurai"
			switch (this.state) {
				case 0: action += "Resting"; break;
				case 1: action += "LeftBottom"; break;
				case 2: action += "Left"; break;
				case 3: action += "LeftUp"; break;
				case 4: action += "RightBottom"; break;
				case 5: action += "Right"; break;
				case 6: action += "RightUp"; break;
				case 7: action += "Up"; break;
				case 8: action += "Middle"; break;
			}

			return action
		}
	}

	var instance;

	function createInstance() {
		var obj = new Player();
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
