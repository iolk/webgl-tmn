
export default (function () {

    class GameState {
        constructor() {
            this.screen = {
                x: 800,
                y: 600,
                center: {
                    x: 0,
                    y: 0,
                }
            }

            this.colors = {
                red: [1, 0, 0, 1],
                green: [0, 1, 0, 1],
                blue: [0, 0, 1, 1],
                gray: [0.4, 0.4, 0.4, 1],
                black: [0, 0, 0, 1],
                white: [1, 1, 1, 1],
            };

            this.GRAVITY = 9.8;

            this.keys = {
                up: false,
                bottom: false,
                right: false,
                left: false,
            }
        }
    }

    var instance;

    function createInstance() {
        var obj = new GameState();
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