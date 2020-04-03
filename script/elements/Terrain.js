import Utils from './GameState.js'

export default class Terrain {
    constructor() {

        this.width = Utils.screen.x
        this.height = 200
        this.color = Utils.colors.red
        this.angle = 0

        this.origin = {
            x: 0,
            y: 0,
        }

        this.translation = {
            x: 0,
            y: Utils.screen.y - terrain.height,
        }

        this.rotation = {
            x: 0,
            y: 1,
        }
    }

}