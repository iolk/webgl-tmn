import GameState from "./GameState.js"

export default class Rectangle {
	constructor() {
		this.height = 100
		this.width = 100
		this.color = [Math.random(), Math.random(), Math.random(), 1]
		this.angle = 0

		this.origin = {
			x: -50,
			y: -50,
		}

		this.translation = {
			x: 0,
			y: 0,
		}
	}
}
