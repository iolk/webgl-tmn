import Utils from './GameState.js'
import Terrain from './Terrain.js'

export default class Player {

    constructor() {
        width = 60
        height = 100
        color = Utils.colors.blue
        state = null
        angle = 0

        origin = {
            x: 0,
            y: 0,
        }

        translation = {
            x: Utils.screen.x / 2 - this.width / 2,
            y: Utils.screen.y - Terrain.height - this.height,
        }

        rotation = {
            x: 0,
            y: 1,
        }
    }
}