import GameState from './GameState.js'
import Player from './Player.js'
import Terrain from './Terrain.js'

export default (function () {
	class Sword {

		constructor() {
			this.width = 70
			this.height = 10
			this.color = GameState.colors.gray
			this.angle = 0

			this.resting = {
				x: 20,
				y: -20,
			}

			this.origin = {
				x: -35,
				y: -5,
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

		update() {
			var left_to_player = GameState.screen.x / 2 - Player.width / 2;
			var right_to_player = GameState.screen.x / 2 + Player.width / 2;
			switch (this.state()) {
				// resting
				case 0:
					this.translation.x = left_to_player - this.width / 2 + this.resting.x;
					this.translation.y = GameState.screen.y - Terrain.height - this.height + this.resting.y;
					this.angle = 0;
					break;

				// left-bottom
				case 1:
					this.translation.x = left_to_player - this.width / 1.5;
					this.translation.y = GameState.screen.y - Terrain.height - Player.height / 4;
					this.angle = 40;
					break;

				// left
				case 2:
					this.translation.x = left_to_player - this.width / 2 - this.resting.x;
					this.translation.y = GameState.screen.y - Terrain.height - this.height / 2 - Player.height / 2;
					this.angle = 0;
					break;

				// left-up
				case 3:
					this.translation.x = left_to_player - this.width / 1.5;
					this.translation.y = GameState.screen.y - Terrain.height - Player.height * 1.1;
					this.angle = -40;
					break;

				// right-bottom
				case 4:
					this.translation.x = right_to_player + this.width / 1.5;
					this.translation.y = GameState.screen.y - Terrain.height - Player.height / 4;
					this.angle = -40;
					break;

				// Right
				case 5:
					this.translation.x = right_to_player + this.width / 2 + this.resting.x;
					this.translation.y = GameState.screen.y - Terrain.height - this.height / 2 - Player.height / 2;
					this.angle = 0;
					break;

				// right-up
				case 6:
					this.translation.x = right_to_player + this.width / 1.5;
					this.translation.y = GameState.screen.y - Terrain.height - Player.height * 1.1;
					this.angle = 40;
					break;

				// up
				case 7:
					this.translation.x = GameState.screen.x / 2;
					this.translation.y = GameState.screen.y - Terrain.height - Player.height * 1.1;
					this.angle = 30;
					break;

				// middle
				case 8:
					this.translation.x = GameState.screen.x / 2 - Player.width / 3;
					this.translation.y = GameState.screen.y - Terrain.height - Player.height / 1.5;
					this.angle = -45;
					break;
			}
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

