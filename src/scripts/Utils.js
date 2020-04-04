import m3 from './vendor/m3.js'
import GameState from './GameState.js'
import Shuriken from './Shuriken.js'
import Sword from './Sword.js'

export default class Utils {

	static drawRectangle(gl, locators, obj) {
		// Setup a rectangle
		this.setRectangle(gl, obj.width, obj.height);

		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		gl.vertexAttribPointer(locators.position, 2, gl.FLOAT, false, 0, 0);

		// Set the color
		gl.uniform4fv(locators.color, obj.color);

		// Matrix to translate the object
		var translation_matrix = m3.translation(obj.translation.x, obj.translation.y);

		// Matrix to rotate the object
		var rotation_matrix = m3.rotation(this.degToRad(obj.angle));

		// Matrix to change object origin
		var origin_matrix = m3.translation(obj.origin.x, obj.origin.y);

		// Multiply all matrix together
		var matrix = m3.multiply(translation_matrix, rotation_matrix);
		matrix = m3.multiply(matrix, origin_matrix);

		// Set the matrix
		gl.uniformMatrix3fv(locators.matrix, false, matrix);

		// Draw the rectangle
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}

	// Fill the buffer with the values that define a rectangle
	static setRectangle(gl, width, height, x = 0, y = 0) {
		var x2 = x + width;
		var y2 = y + height;
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([
				x, y,
				x2, y,
				x, y2,
				x, y2,
				x2, y,
				x2, y2,
			]),
			gl.STATIC_DRAW);
	}

	static debugDraw(gl, locators, v) {
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([
				v[0][0], v[0][1],
				v[1][0], v[1][1],
				v[2][0], v[2][1],
				v[1][0], v[1][1],
				v[2][0], v[2][1],
				v[3][0], v[3][1],
			]),
			gl.STATIC_DRAW);

		gl.vertexAttribPointer(locators.position, 2, gl.FLOAT, false, 0, 0);
		gl.uniform4fv(locators.color, GameState.colors.black);
		gl.uniformMatrix3fv(locators.matrix, false, m3.translation(0, 0));
		gl.drawArrays(gl.TRIANGLES, 0, 6);
	}

	static areColliding(a, b) {
		var p_a = this.computeProjections(a, a.angle);
		var p_b = this.computeProjections(b, a.angle);

		for (var i = 0; i < 2; i++)
			if (!this.areOverlapping(p_a[i], p_b[i]))
				return false;

		var p_a2 = this.computeProjections(a, b.angle);
		var p_b2 = this.computeProjections(b, b.angle);

		for (var i = 0; i < 2; i++)
			if (!this.areOverlapping(p_a2[i], p_b2[i]))
				return false;

		console.log("collision")
		console.log(p_a)
		console.log(p_b)
		console.log(p_a2)
		console.log(p_b2)
		console.log("#######")

		return true;
	}

	static areOverlapping(p_a, p_b) {
		return !(p_a.min > p_b.max || p_a.max < p_b.min);
	}

	static computeProjections(obj, angle) {
		var vertices = this.getRectangleVertices(obj)

		if (angle != 0) {
			vertices = this.rotateRefSistem(vertices, angle)
		}

		var min = { x: vertices[0][0], y: vertices[0][1] }
		var max = { x: vertices[0][0], y: vertices[0][1] }

		for (var i = 1; i < vertices.length; i++) {
			min.x = min.x <= vertices[i][0] ? min.x : vertices[i][0];
			min.y = min.y <= vertices[i][1] ? min.y : vertices[i][1];
			max.x = max.x >= vertices[i][0] ? max.x : vertices[i][0];
			max.y = max.y >= vertices[i][1] ? max.y : vertices[i][1];
		}

		return [
			{ min: min.x, max: max.x },
			{ min: min.y, max: max.y }
		]
	}

	static getRectangleVertices(obj) {
		var x = obj.origin.x
		var y = obj.origin.y

		var v = [
			[x, y],
			[x + obj.width, y],
			[x, y + obj.height],
			[x + obj.width, y + obj.height],
		]

		v = this.rotateRefSistem(v, -obj.angle)

		for (var i = 0; i < v.length; i++) {
			v[i][0] += obj.translation.x
			v[i][1] += obj.translation.y
		}

		return v
	}

	static rotateRefSistem(v, angle) {
		var radAngle = this.degToRad(angle);
		var sen_a = Math.sin(radAngle);
		var cos_a = Math.cos(radAngle);

		for (var i = 0; i < v.length; i++) {
			var x = v[i][0];
			var y = v[i][1];
			v[i][0] = x * cos_a - y * sen_a;
			v[i][1] = x * sen_a + y * cos_a;
		}
		return v
	}


	static printUI() {
		webglLessonsUI.setupSlider("#x", { value: sword.translation.x, slide: (e, u) => { sword.translation.x = u.value }, max: screen.x });
		webglLessonsUI.setupSlider("#y", { value: sword.translation.y, slide: (e, u) => { sword.translation.y = u.value }, max: screen.y });
		$("#rotation").gmanUnitCircle({
			width: 200,
			height: 200,
			value: 0,
			slide: function (e, u) {
				sword.rotation.x = u.x;
				sword.rotation.y = u.y;
			}
		});
	}

	static radToDeg(r) { return r * 180 / Math.PI; }
	static degToRad(d) { return d * Math.PI / 180; }
	static getRandomInt(max) { return Math.floor(Math.random() * Math.floor(max)); }
}
