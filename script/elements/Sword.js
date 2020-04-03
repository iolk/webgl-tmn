import Utils from './GameState.js'

export default class Sword {

    constructor() {
        this.width = 70
        this.height = 10
        this.color = Utils.colors.gray
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
        var left_to_player = Utils.screen.x / 2 - player.width / 2;
        var right_to_player = Utils.screen.x / 2 + player.width / 2;
        switch (this.state()) {
            // resting
            case 0:
                sword.translation.x = left_to_player - sword.width / 2 + sword.resting.x;
                sword.translation.y = Utils.screen.y - terrain.height - sword.height + sword.resting.y;
                sword.angle = 0;
                break;

            // left-bottom
            case 1:
                sword.translation.x = left_to_player - sword.width / 1.5;
                sword.translation.y = Utils.screen.y - terrain.height - player.height / 4;
                sword.angle = 40;
                break;

            // left
            case 2:
                sword.translation.x = left_to_player - sword.width / 2 - sword.resting.x;
                sword.translation.y = Utils.screen.y - terrain.height - sword.height / 2 - player.height / 2;
                sword.angle = 0;
                break;

            // left-up
            case 3:
                sword.translation.x = left_to_player - sword.width / 1.5;
                sword.translation.y = Utils.screen.y - terrain.height - player.height * 1.1;
                sword.angle = -40;
                break;

            // right-bottom
            case 4:
                sword.translation.x = right_to_player + sword.width / 1.5;
                sword.translation.y = Utils.screen.y - terrain.height - player.height / 4;
                sword.angle = -40;
                break;

            // Right
            case 5:
                sword.translation.x = right_to_player + sword.width / 2 + sword.resting.x;
                sword.translation.y = Utils.screen.y - terrain.height - sword.height / 2 - player.height / 2;
                sword.angle = 0;
                break;

            // right-up
            case 6:
                sword.translation.x = right_to_player + sword.width / 1.5;
                sword.translation.y = Utils.screen.y - terrain.height - player.height * 1.1;
                sword.angle = 40;
                break;

            // up
            case 7:
                sword.translation.x = Utils.screen.x / 2;
                sword.translation.y = Utils.screen.y - terrain.height - player.height * 1.1;
                sword.angle = 30;
                break;

            // middle
            case 8:
                sword.translation.x = Utils.screen.x / 2 - player.width / 3;
                sword.translation.y = Utils.screen.y - terrain.height - player.height / 1.5;
                sword.angle = -45;
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
        if (Utils.keys.left && Utils.keys.right) return 8;
        if (Utils.keys.left || Utils.keys.right) {
            var state = Utils.keys.left ? 2 : 0 + Utils.keys.right ? 5 : 0;
            return state + (Utils.keys.up ? 1 : 0) - (Utils.keys.bottom ? 1 : 0);
        } else {
            return (Utils.keys.up || Utils.keys.bottom) ? 7 : 0;
        }
    }
}