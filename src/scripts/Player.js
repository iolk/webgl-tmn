import GameState from './GameState.js'
import Terrain from './Terrain.js'
import Sword from './Sword.js'
import Rectangle from './Rectangle.js'

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

			// Sizes based on textures where off is used to center the texture
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
			this.width = this.sizes[this.state].w
			this.height = this.sizes[this.state].h
			this.color = GameState.colors.blue
			this.angle = 0
			this.have_texture = true

			this.hitboxes = []
			this.hitboxes[0] = new Rectangle(0, 0, GameState.colors.red, 0)

			this.hb_sizes = [];
			this.hb_sizes[0] = [];
			this.hb_sizes[0][0] = { w: 28, h: 64, off: -2 }
			this.hb_sizes[0][1] = { w: 28, h: 64, off: -10 }
			this.hb_sizes[0][2] = { w: 28, h: 64, off: -7 }
			this.hb_sizes[0][3] = { w: 28, h: 64, off: -10 }
			this.hb_sizes[0][4] = { w: 28, h: 64, off: 4 }
			this.hb_sizes[0][5] = { w: 28, h: 64, off: 2 }
			this.hb_sizes[0][6] = { w: 28, h: 64, off: 8 }
			this.hb_sizes[0][7] = { w: 28, h: 38, off: 4 }
			this.hb_sizes[0][8] = { w: 28, h: 54, off: -2 }
			this.hb_sizes[0][9] = { w: 18, h: 64, off: 5 }
			this.hb_sizes[0][10] = { w: 28, h: 64, off: -2 }

			this.hitboxes[1] = new Rectangle(0, 0, GameState.colors.green, 0)
			this.hb_sizes[1] = [];
			this.hb_sizes[1][0] = { w: 66, h: 20, off: 1 }
			this.hb_sizes[1][1] = { w: 66, h: 20, off: -2 }
			this.hb_sizes[1][2] = { w: 64, h: 20, off: 0 }
			this.hb_sizes[1][3] = { w: 70, h: 20, off: -4 }
			this.hb_sizes[1][4] = { w: 70, h: 20, off: 0 }
			this.hb_sizes[1][5] = { w: 70, h: 20, off: 0 }
			this.hb_sizes[1][6] = { w: 70, h: 20, off: 0 }
			this.hb_sizes[1][7] = { w: 64, h: 20, off: 0 }
			this.hb_sizes[1][8] = { w: 66, h: 20, off: 1 }
			this.hb_sizes[1][9] = { w: 66, h: 20, off: 1 }
			this.hb_sizes[1][10] = { w: 66, h: 20, off: 1 }

			this.origin = {
				x: 0,
				y: 0,
			}

			this.translation = {
				x: 0,
				y: 0,
			}

			this.setSize()
		}

		update() {
			this.state = Sword.state()
			this.setSize()
		}

		setSize() {
			this.width = this.sizes[this.state].w
			this.height = this.sizes[this.state].h
			this.translation.x = GameState.screen.x / 2 - this.width / 2 + this.sizes[this.state].off
			this.translation.y = GameState.screen.y - Terrain.height - this.height

			this.hitboxes[0].width = this.hb_sizes[0][this.state].w
			this.hitboxes[0].height = this.hb_sizes[0][this.state].h
			this.hitboxes[0].translation.x = GameState.screen.x / 2 - this.hitboxes[0].width / 2 + this.hb_sizes[0][this.state].off
			this.hitboxes[0].translation.y = GameState.screen.y - Terrain.height - this.hitboxes[0].height

			this.hitboxes[1].width = this.hb_sizes[1][this.state].w
			this.hitboxes[1].height = this.hb_sizes[1][this.state].h
			this.hitboxes[1].translation.x = GameState.screen.x / 2 - this.hitboxes[1].width / 2 + this.hb_sizes[1][this.state].off
			this.hitboxes[1].translation.y = GameState.screen.y - Terrain.height - this.hitboxes[1].height
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
				case 9: action += "Middle2"; break;
				case 10: action += "Resting2"; break;
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
