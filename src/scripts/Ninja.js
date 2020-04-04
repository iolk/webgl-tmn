import GameState from './GameState.js'
import Terrain from './Terrain.js'
import Player from './Player.js'
import Sword from './Sword.js'
import Shuriken from './Shuriken.js'
import Utils from './Utils.js'

export default class Ninja {

	constructor() {
		var left_spawn = Utils.getRandomInt(1000) % 2 == 0;
		var spawn_x = left_spawn ? 0 : GameState.screen.x - 50;
		var spawn_y = Utils.getRandomInt(GameState.screen.y - Terrain.height - 200);

		this.width = 50
		this.height = 60
		this.weight = 0.2
		this.stop = false
		this.restart_time = 2
		this.left_spawn = left_spawn
		this.shuriken_time = Utils.getRandomInt(40)
		this.shuriken_spawned = false
		this.slide = Utils.getRandomInt(1000) % 2 == 0 ? true : false
		this.angle = 0
		this.color = GameState.colors.green

		this.speed = {
			x: left_spawn ? 15 : -15,
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

		this.rotation = {
			x: 0,
			y: 1,
		}

	}

	update(delta, id) {
		if (Utils.areColliding(Sword, this)) {
			GameState.ninjas.splice(id, 1);
			GameState.points++
		}
		if (Utils.areColliding(Player, this)) {
			GameState.stop = true;
		}

		if (!this.stop) {
			this.translation.x += (this.speed.x * (delta / 100));
			this.translation.y += (this.speed.y * (delta / 100));

			if (this.translation.y + this.height > GameState.screen.center.y) {
				if (!this.slide) {
					this.stop = true;
				}
				this.speed.y = 0;
				this.translation.y = GameState.screen.center.y - this.height;
				this.color = GameState.colors.black;
			} else {
				this.speed.y += GameState.GRAVITY * this.weight;
			}
			if (this.translation.x > GameState.screen.x || this.translation.x < 0) {
				this.stop = true;
				GameState.ninjas.splice(id, 1);
			}
		} else {
			if (this.restart_time <= 0) {
				this.stop = false;
				this.restart_time = 2;
				this.speed.y = -70;
				this.weight = 0.3;
				this.speed.x = this.left_spawn ? 25 : -25;
				this.color = GameState.colors.green;
			} else {
				this.restart_time -= delta / 100;
			}
		}
		if (this.shuriken_time <= 0 && !this.shuriken_spawned && this.translation.y < GameState.screen.center.y - Player.height) {
			var shuriken = new Shuriken(this);
			GameState.shurikens.push(shuriken);
			this.shuriken_spawned = true;
		} else {
			this.shuriken_time -= delta / 100;
		}
	}
}
