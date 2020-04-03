'use strict';



const v_shader = `
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
    }`;

const f_shader = `
    precision mediump float;
    uniform vec4 color;

    void main() {
        gl_FragColor = color;
    }`;




screen.center.x = screen.x / 2;
screen.center.y = screen.y - terrain.height;


function main() {
    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    var canvas = document.getElementById("canvasgl");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    webglLessonsUI.setupSlider("#x", { value: sword.translation.x, slide: (e, u) => { sword.translation.x = u.value }, max: screen.x });
    webglLessonsUI.setupSlider("#y", { value: sword.translation.y, slide: (e, u) => { sword.translation.y = u.value }, max: screen.y });
    $("#rotation").gmanUnitCircle({
        width: 200,
        height: 200,
        value: 0,
        slide: function (e, u) {
            sword.rotation.x = u.x;
            sword.rotation.y = u.y;
            drawScene();
        }
    });

    // setup GLSL program
    var program = webglUtils.createProgramFromSources(gl, [v_shader, f_shader]);

    // look up where the vertex data needs to go.
    var positionLocation = gl.getAttribLocation(program, "position");

    // lookup uniforms
    var resolutionLocation = gl.getUniformLocation(program, "resolution");
    var colorLocation = gl.getUniformLocation(program, "color");
    //var rotationLocation = gl.getUniformLocation(program, "rotation");
    //var translationLocation = gl.getUniformLocation(program, "translation");
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
        //rotation: rotationLocation,
        //translation: translationLocation,
    };

    var updateId, previousDelta = 0, fpsLimit = 30, lastSpawn = 0;
    var shurikens = [];
    var ninjas = [];

    // Draw a the scene.
    function drawScene(currentDelta) {
        // ----- FPS LIMIT START -----
        updateId = requestAnimationFrame(drawScene);

        var delta = currentDelta - previousDelta;

        if (fpsLimit && delta < 1000 / fpsLimit) {
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

        if (currentDelta - lastSpawn > 3000 && ninjas.length <= 3) {
            var ninja = newNinja();
            console.log(ninja);
            ninjas.push(ninja);

            lastSpawn = currentDelta;
        }

        // Update the player state before draw
        updatePlayer();

        // Terrain
        drawRectangle(gl, locators, terrain);

        // Player
        drawRectangle(gl, locators, player);

        // Sword
        drawRectangle(gl, locators, sword);

        ninjas.forEach((ninja, index) => {
            if (!ninja.stop) {
                ninja.translation.x += (ninja.speed.x * (delta / 100));
                ninja.translation.y += (ninja.speed.y * (delta / 100));

                if (ninja.translation.y + ninja.height > screen.center.y) {
                    if (!ninja.slide) {
                        ninja.stop = true;
                    }
                    ninja.speed.y = 0;
                    ninja.translation.y = screen.center.y - ninja.height;
                    ninja.color = colors.black;
                } else {
                    ninja.speed.y += GRAVITY * ninja.weight;
                }
                if (ninja.translation.x > screen.x || ninja.translation.x < 0) {
                    ninja.stop = true;
                    ninjas.splice(index, 1);
                }
            } else {
                if (ninja.restart_time <= 0) {
                    ninja.stop = false;
                    ninja.restart_time = 2;
                    ninja.speed.y = -70;
                    ninja.weight = 0.3;
                    ninja.speed.x = ninja.left_spawn ? 25 : -25;
                    ninja.color = colors.green;
                } else {
                    ninja.restart_time -= delta / 100;
                }
            }
            if (ninja.shuriken_time <= 0 && !ninja.shuriken_spawned && ninja.translation.y < screen.center.y - player.height) {
                var shuriken = newShuriken(ninja);
                console.log(shuriken);
                shurikens.push(shuriken);
                ninja.shuriken_spawned = true;
            } else {
                ninja.shuriken_time -= delta / 100;
            }

            drawRectangle(gl, locators, ninja)
        });

        shurikens.forEach((shuriken, index) => {
            if (!shuriken.stop) {

                if (shuriken.translation.y > screen.center.y) {
                    shuriken.stop = true;
                    shuriken.color = colors.black;
                }/*

                if (collides(shuriken, sword)) {
                    shuriken.direction.x = -shuriken.direction.x;
                    shuriken.direction.y = -shuriken.direction.y;
                    shuriken.color = colors.black;
                    player.color = colors.red;
                }

                if (collides(shuriken, player)) {
                    shuriken.stop = true;
                    shuriken.color = colors.black;
                    player.color = colors.red;
                }*/


                shuriken.angle = (shuriken.angle + shuriken.rotation_speed * (delta / 100)) % 361;
                shuriken.translation.x += (shuriken.direction.x * shuriken.speed * (delta / 100));
                shuriken.translation.y += (shuriken.direction.y * shuriken.speed * (delta / 100));
            }
            drawRectangle(gl, locators, shuriken)
        });

        previousDelta = currentDelta;
    }
    drawScene();
}

function collides(a, b) {
    return (a.translation.x < b.translation.x + b.width &&
        a.translation.x + a.width > b.translation.x &&
        a.translation.y < b.translation.y + b.height &&
        a.translation.y + a.height > b.translation.y);
}

// ---------- DRAWING FUNCTION START ---------- 
function newNinja() {
    var left_spawn = getRandomInt(1000) % 2 == 0;
    var spawn_x = left_spawn ? 0 : screen.x - 50;
    var spawn_y = getRandomInt(screen.y - terrain.height - 200);
    return {
        width: 50,
        height: 60,
        weight: 0.2,
        stop: false,
        restart_time: 2,
        left_spawn: left_spawn,
        shuriken_time: getRandomInt(40),
        shuriken_spawned: false,
        slide: getRandomInt(1000) % 2 == 0 ? true : false,
        angle: 0,
        color: colors.green,

        speed: {
            x: left_spawn ? 15 : -15,
            y: 0,
        },
        origin: {
            x: 0,
            y: 0,
        },
        translation: {
            x: spawn_x,
            y: spawn_y,
        },
        rotation: {
            x: 0,
            y: 1,
        },

    }
}

function newShuriken(ninja) {
    var spawn_x = ninja.translation.x + ninja.width / 2;
    var spawn_y = ninja.translation.y + ninja.height / 2;

    var m = ((spawn_y - 15) - screen.center.y) / ((spawn_x - 15) - screen.center.x);

    var x_angle = radToDeg(Math.atan(m));
    var ng = x_angle < 0;
    x_angle *= ng ? -1 : 1;
    var y_angle = 90 - x_angle;
    y_angle *= ng ? -1 : 1;

    return {
        width: 20,
        height: 20,
        speed: 30,
        angle: 0,
        stop: false,
        rotation_speed: 60,
        color: colors.blue,

        origin: {
            x: -10,
            y: -10,
        },
        direction: {
            x: Math.sin(degToRad(y_angle)),
            y: Math.sin(degToRad(x_angle)),
        },
        translation: {
            x: spawn_x,
            y: spawn_y,
        },
        rotation: {
            x: 0,
            y: 1,
        },

    }
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
