import GameState from './GameState.js'
import Terrain from './Terrain.js'
import Player from './Player.js'
import Sword from './Sword.js'
import Shuriken from './Shuriken.js'
import Utils from './Utils.js'

export default class Ninja {

	constructor() {

		this.sizes = [];
		this.sizes[0] = { w: 44, h: 50 }
		this.sizes[1] = { w: 36, h: 56 }
		this.sizes[2] = { w: 44, h: 50 }
		this.sizes[3] = { w: 50, h: 74 }
		this.sizes[4] = { w: 92, h: 54 }

		this.width = this.sizes[0].w
		this.height = this.sizes[0].h
		this.angle = 0
		this.have_texture = true
		this.color = GameState.colors.green

		// Shuriken settings
		this.shuriken_spawned = false
		this.shuriken_time = Utils.getRandomInt(40)

		// Type settings
		this.slide = Utils.getRandomInt(1000) % 2 == 0 ? true : false
		this.restart_time = 4
		this.jumping_time = 4
		this.launch_time = 4
		this.weight = 0.2
		this.stop = false

		// Spawn settings
		this.left_spawn = Utils.getRandomInt(1000) % 2 == 0
		var spawn_x = this.left_spawn ? 0 : GameState.screen.x - 50
		var spawn_y = Utils.getRandomInt(GameState.screen.y - Terrain.height - 200)

		/**
		 * 0 - Air
		 * 1 - Landed
		 * 2 - Launch
		 * 3 - Jump
		 * 4 - Sliding
		 */
		this.state = 0

		this.speed = {
			x: this.left_spawn ? 15 : -15,
			y: 0,
		}

		this.origin = {
			x: 0,
			y: 0,
		}

		this.translation = {
			x: spawn_x,
			y: spawn_y,
		}
	}

	move(delta) {
		this.translation.x += (this.speed.x * (delta / 100))
		this.translation.y += (this.speed.y * (delta / 100))
		this.speed.y += GameState.GRAVITY * this.weight
	}

	setSize() {
		this.width = this.sizes[this.state].w
		this.height = this.sizes[this.state].h
		// If touch the terrain lands
		if (this.translation.y + this.height > GameState.screen.center.y) {
			this.translation.y = GameState.screen.center.y - this.height
		}
	}

	update(delta, id) {
		if (Utils.areColliding(Sword, this)) {
			GameState.ninjas.splice(id, 1)
			GameState.points++
		}
		if (Utils.areColliding(Player, this)) {
			GameState.stop = true
		}

		if (this.translation.x > GameState.screen.x || this.translation.x < 0) {
			this.stop = true
			GameState.ninjas.splice(id, 1)
		}

		if (this.shuriken_time <= 0 && !this.shuriken_spawned &&
			this.translation.y < GameState.screen.center.y - Player.height) {
			this.state = 2
			var shuriken = new Shuriken(this)
			GameState.shurikens.push(shuriken)
			this.shuriken_spawned = true
		} else {
			this.shuriken_time -= delta / 100
		}

		switch (this.state) {
			case 0:
				// In Air Ninja
				this.move(delta)

				// If touch the terrain lands
				if (this.translation.y + this.height > GameState.screen.center.y) {
					this.state = 1
					this.translation.y = GameState.screen.center.y - this.height
				}
				break;

			case 1:
				// Landed Ninja
				if (this.restart_time <= 0) {
					if (this.slide) {
						this.state = 4
						this.speed.y = 0
					} else {
						this.state = 3
						this.speed.y = -70
						this.speed.x = this.left_spawn ? 25 : -25
						this.weight = 0.3
					}

					this.restart_time = 2
				} else {
					this.restart_time -= delta / 100
				}
				break;

			case 2:
				// Launching Ninja
				this.move(delta)
				if (this.launch_time <= 0) {
					this.state = 0
					this.launch_time = 2
				} else {
					this.launch_time -= delta / 100
				}
				break;

			case 3:
				// Jumping Ninja
				this.move(delta)
				if (this.jumping_time <= 0) {
					this.state = 0
					this.jumping_time = 2
				} else {
					this.jumping_time -= delta / 100
				}
				break;

			case 4:
				// Sliding Ninja
				this.move(delta)
				this.speed.y = 0
				break;
		}

		this.setSize()
	}

	getTextureName() {
		var action = "Ninja"
		var direction = this.left_spawn ? "Left" : "Right"
		switch (this.state) {
			case 0: action += "Air"; break;
			case 1: action += "Landed"; break;
			case 2: action += "Launch"; break;
			case 3: action += "Jump"; break;
			case 4: action += "Sliding"; break;
		}

		return action + direction
	}
}
