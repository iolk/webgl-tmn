'use strict';

import $ from "jquery";
import GLManager from './scripts/GLManager.js'
import GameState from './scripts/GameState.js'
import Utils from './scripts/Utils.js'
import Terrain from './scripts/Terrain.js'
import Background from './scripts/Background.js'
import Player from './scripts/Player.js'
import Sword from './scripts/Sword.js'
import Ninja from './scripts/Ninja.js'
import Shuriken from './scripts/Shuriken.js'
import Rectangle from './scripts/Rectangle.js'
import ImageLoader from './scripts/ImageLoader.js';

GameState.screen.center.x = GameState.screen.x / 2;
GameState.screen.center.y = GameState.screen.y - Terrain.height;

const DEBUG = false

if (DEBUG) {
	var a = new Rectangle(1, GameState.screen.y, GameState.colors.red, 0);
	a.translation.x = GameState.screen.center.x;
}

function main() {
	// Get A WebGL context
	/** @type {HTMLCanvasElement} */
	var canvas = document.getElementById("canvasgl");
	var gl = canvas.getContext("webgl");
	if (!gl) {
		return;
	}

	GLManager.gl = gl
	GLManager.setProgram()

	ImageLoader.load()

	var previous_delta = 0
	var last_spawn = 0
	var max_spawn_time = 3000
	var min_spawn_time = 700
	var max_spawn = 2

	// Draw a the scene.
	function drawScene(current_delta) {
		// ----- FPS LIMIT START -----
		requestAnimationFrame(drawScene);

		if (!ImageLoader.loaded())
			return;

		var delta = current_delta - previous_delta;

		if (GLManager.fpsLimit(delta))
			return;
		// ----- FPS LIMIT END -----

		GLManager.settings()

		if (!GameState.stop) {

			var level = Math.floor(GameState.points / 10);
			var spawn_time = max_spawn_time - 300 * level;
			spawn_time = spawn_time < min_spawn_time ? min_spawn_time : spawn_time;


			if (current_delta - last_spawn > spawn_time
				&& GameState.ninjas.length <= max_spawn + level) {
				var ninja = new Ninja();
				GameState.ninjas.push(ninja)
				last_spawn = current_delta;
			}

			Utils.drawRectangle(GLManager.gl, GLManager.locators, GLManager.buffers, Background);
			Utils.drawRectangle(GLManager.gl, GLManager.locators, GLManager.buffers, Terrain);

			Sword.update();
			Player.update();
			Utils.drawRectangle(GLManager.gl, GLManager.locators, GLManager.buffers, Player);

			GameState.ninjas.forEach((ninja, id) => {
				ninja.update(delta, id)
				Utils.drawRectangle(GLManager.gl, GLManager.locators, GLManager.buffers, ninja);
			});
			GameState.shurikens.forEach((shuriken, id) => {
				shuriken.update(delta, id)
				Utils.drawRectangle(GLManager.gl, GLManager.locators, GLManager.buffers, shuriken);
			});


			// ----- DEBUG DRAW START -----
			if (DEBUG) {
				GameState.ninjas.forEach((ninja, id) => {
					Utils.drawRectangle(GLManager.gl, GLManager.locators, GLManager.buffers, ninja.hitbox);
				});
				GameState.shurikens.forEach((shuriken, id) => {
					shuriken.have_texture = false
					shuriken.color = [127, 127, 0, 1]
					Utils.drawRectangle(GLManager.gl, GLManager.locators, GLManager.buffers, shuriken);
				});

				Utils.drawRectangle(GLManager.gl, GLManager.locators, GLManager.buffers, Sword);

				Utils.drawRectangle(GLManager.gl, GLManager.locators, GLManager.buffers, a);

				Player.hitboxes.forEach(hitbox => {
					Utils.drawRectangle(GLManager.gl, GLManager.locators, GLManager.buffers, hitbox);
				});
			}
			// ----- DEBUG DRAW END -----

			$('#points').text("SCORE: " + GameState.points)
			$('#level').text("LEVEL: " + level)
			$('#level').css("margin-left", (320 - $('#level').width() - 30) + "px")
		}

		previous_delta = current_delta;
	}
	drawScene();
}

// ---------- KEYBOARD EVENTS START ----------
document.addEventListener("keydown", event => {
	if (event.isComposing || event.keyCode < 37 || event.keyCode > 40) { return; }
	switch (event.keyCode) {
		case 37: GameState.keys.left = true; break;
		case 38: GameState.keys.up = true; break;
		case 39: GameState.keys.right = true; break;
		case 40: GameState.keys.bottom = true; break;
	}
});

document.addEventListener("keyup", event => {
	if (event.isComposing || event.keyCode < 37 || event.keyCode > 40) { return; }
	switch (event.keyCode) {
		case 37: GameState.keys.left = false; break;
		case 38: GameState.keys.up = false; break;
		case 39: GameState.keys.right = false; break;
		case 40: GameState.keys.bottom = false; break;
	}
});
// ---------- KEYBOARD EVENTS START ----------

main();
