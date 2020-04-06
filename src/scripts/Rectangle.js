import GameState from "./GameState.js"
import Utils from "./Utils.js"

export default class Rectangle {
	constructor(width, height, color, angle) {
		this.width = width
		this.height = height
		this.color = color
		this.angle = angle
		this.have_texture = false;

		this.origin = {
			x: 0,
			y: 0,
		}

		this.translation = {
			x: 0,
			y: 0,
		}
	}
}
