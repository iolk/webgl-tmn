export default class Shuriken {

    constructor(ninja) {

        // Shuriken spawn coordinates
        var spawn_x = ninja.translation.x + ninja.width / 2;
        var spawn_y = ninja.translation.y + ninja.height / 2;

        // Angular coefficient between shuriken and screen center
        var m = ((spawn_y - 15) - screen.center.y) / ((spawn_x - 15) - screen.center.x);

        // Angles with x and y axis
        var x_angle = radToDeg(Math.atan(m));
        var ng = x_angle < 0;
        x_angle *= ng ? -1 : 1;
        var y_angle = 90 - x_angle;
        y_angle *= ng ? -1 : 1;

        this.width = 20
        this.height = 20
        this.speed = 30
        this.angle = 0
        this.stop = false
        this.rotation_speed = 60
        this.color = colors.blue

        this.origin = {
            x: -10,
            y: -10,
        }

        this.direction = {
            x: Math.sin(degToRad(y_angle)),
            y: Math.sin(degToRad(x_angle)),
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