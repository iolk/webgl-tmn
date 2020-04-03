'use strict';

import webglUtils from './scripts/vendor/webgl-utils.js'

import GameState from './scripts/GameState.js'
import Terrain from './scripts/Terrain.js'
import Player from './scripts/Player.js'
import Sword from './scripts/Sword.js'
import Ninja from './scripts/Ninja.js'
import Shuriken from './scripts/Shuriken.js'
import GLProgram from './scripts/GLProgram.js'
import Utils from './scripts/Utils.js'

GameState.screen.center.x = GameState.screen.x / 2;
GameState.screen.center.y = GameState.screen.y - Terrain.height;

function main() {
	// Get A WebGL context
	/** @type {HTMLCanvasElement} */
	var canvas = document.getElementById("canvasgl");
	var gl = canvas.getContext("webgl");
	if (!gl) {
		return;
	}

	// setup GLSL program
	var program = webglUtils.createProgramFromSources(gl, [GLProgram.vertexShader(), GLProgram.fragmentShader()]);

	// look up where the vertex data needs to go.
	var positionLocation = gl.getAttribLocation(program, "position");

	// lookup uniforms
	var resolutionLocation = gl.getUniformLocation(program, "resolution");
	var colorLocation = gl.getUniformLocation(program, "color");
	var matrixLocation = gl.getUniformLocation(program, "matrix");

	// Create a buffer to put positions in
	var positionBuffer = gl.createBuffer();

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	var locators = {
		position: positionLocation,
		resolution: resolutionLocation,
		color: colorLocation,
		matrix: matrixLocation,
	};

	var previous_delta = 0
	var fps_limit = 30
	var last_spawn = 0

	// Draw a the scene.
	function drawScene(current_delta) {
		// ----- FPS LIMIT START -----
		var update_id = requestAnimationFrame(drawScene);

		var delta = current_delta - previous_delta;

		if (fps_limit && delta < 1000 / fps_limit) {
			return;
		}
		// ----- FPS LIMIT END -----

		// ----- GL SETTING START -----
		webglUtils.resizeCanvasToDisplaySize(gl.canvas);
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.clear(gl.COLOR_BUFFER_BIT);

		gl.useProgram(program);
		gl.enableVertexAttribArray(locators.position);

		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.uniform2f(locators.resolution, gl.canvas.width, gl.canvas.height);
		// ----- GL SETTING END -----

		if (current_delta - last_spawn > 3000 && GameState.ninjas.length <= 3) {
			var ninja = new Ninja();
			GameState.ninjas.push(ninja);

			last_spawn = current_delta;
		}

		Utils.drawRectangle(gl, locators, Terrain);
		Utils.drawRectangle(gl, locators, Player);

		Sword.update();
		Utils.drawRectangle(gl, locators, Sword);

		GameState.ninjas.forEach((ninja, id) => {
			ninja.update(delta, id)
			Utils.drawRectangle(gl, locators, ninja);
		});
		GameState.shurikens.forEach((shuriken, id) => {
			shuriken.update(delta, id)
			Utils.drawRectangle(gl, locators, shuriken);
		});

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
