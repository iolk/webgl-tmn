export default class Ninja {

    constructor() {
        var left_spawn = getRandomInt(1000) % 2 == 0;
        var spawn_x = left_spawn ? 0 : screen.x - 50;
        var spawn_y = getRandomInt(screen.y - terrain.height - 200);

        this.width = 50
        this.height = 60
        this.weight = 0.2
        this.stop = false
        this.restart_time = 2
        this.left_spawn = left_spawn
        this.shuriken_time = getRandomInt(40)
        this.shuriken_spawned = false
        this.slide = getRandomInt(1000) % 2 == 0 ? true : false
        this.angle = 0
        this.color = colors.green

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
}