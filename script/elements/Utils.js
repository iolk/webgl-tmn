
export default class Utils {

    drawRectangle(gl, locators, obj) {
        // Setup a rectangle
        setRectangle(gl, obj.width, obj.height);

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
    setRectangle(gl, width, height, x = 0, y = 0) {
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

    radToDeg(r) { return r * 180 / Math.PI; }
    degToRad(d) { return d * Math.PI / 180; }
    getRandomInt(max) { return Math.floor(Math.random() * Math.floor(max)); }
}