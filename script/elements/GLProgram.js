export default class GLProgram {
    vertexShader() {
        return `
            attribute vec2 position;

            uniform vec2 resolution;
            uniform mat3 matrix;

            void main() {

                // Multiply the position by the matrix.
                vec2 new_position = (matrix * vec3(position, 1)).xy;

                // convert the rectangle points from pixels to 0.0 to 1.0
                vec2 zeroToOne = new_position / resolution;

                // convert from 0->1 to 0->2
                vec2 zeroToTwo = zeroToOne * 2.0;

                // convert from 0->2 to -1->+1 (clipspace)
                vec2 clipSpace = zeroToTwo - 1.0;

                gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
            }
        `
    }

    fragmentShader() {
        return `
            precision mediump float;
            uniform vec4 color;

            void main() {
                gl_FragColor = color;
            }
        `
    }
}