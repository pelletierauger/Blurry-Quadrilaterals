let looping = true;
let keysActive = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/sketch";
let maxFrames = 20;
let gl, shaderProgram;
let vertices = [];
let colors = [];
let indices = [];

function setup() {
    socket = io.connect('http://localhost:8080');
    pixelDensity(1);
    // cnvs = createCanvas(windowWidth, windowWidth / 16 * 9, WEBGL);
    noCanvas();
    cnvs = document.getElementById('my_Canvas');
    gl = cnvs.getContext('webgl', { preserveDrawingBuffer: true });
    // canvasDOM = document.getElementById('my_Canvas');
    // canvasDOM = document.getElementById('defaultCanvas0');
    // gl = canvasDOM.getContext('webgl');
    // gl = cnvs.drawingContext;

    // gl = canvasDOM.getContext('webgl', { premultipliedAlpha: false });



    // gl.colorMask(false, false, false, true);
    // gl.colorMask(false, false, false, true);

    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(false);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.colorMask(true, true, true, true);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);

    // Set the view port
    gl.viewport(0, 0, cnvs.width, cnvs.height);


    frameRate(30);
    background(0);
    fill(255, 50);
    noStroke();
    if (!looping) {
        noLoop();
    }

}
let ww;

function draw() {
    ww = map(sin(frameCount * 0.05), -1, 1, 0.05, 1);
    rectangles = 0;

    let t = frameCount * 5;
    let osc = 0.1;
    vertices = [];
    colors = [];
    indices = [];

    let rectangle;

    // rectangle = makeQuad({
    //     c: [0.0, 0.0, 0.0, 0.15],
    //     v: [
    //         [-2 + (Math.sin(t * 0.05) * osc), -1 + (Math.cos(t * 0.05) * osc)],
    //         [2 + (Math.sin(t * 0.015) * osc), -1 + (Math.cos(t * 0.015) * osc)],
    //         [2 + (Math.sin(t * 0.015) * osc), 1 + (Math.cos(t * 0.015) * osc)],
    //         [-2 + (Math.sin(t * 0.05) * osc), 1 + (Math.cos(t * 0.05) * osc)]
    //     ]
    // });
    // addRectangleToBuffers(rectangle);

    let r = map(sin(frameCount * 0.15), -1, 1, 0, 1);
    rectangle = makeQuad({
        c: [0.9, r, 1 - r, 1.0],
        v: [
            [-0.35 + (Math.sin(t * 0.05) * osc), 0.25 + (Math.cos(t * 0.05) * osc)],
            [0.35 + (Math.sin(t * 0.015) * osc), 0.25 + (Math.cos(t * 0.015) * osc)],
            [0.35 + (Math.sin(t * 0.015) * osc), 0.27 + (Math.cos(t * 0.015) * osc)],
            [-0.35 + (Math.sin(t * 0.05) * osc), 0.27 + (Math.cos(t * 0.05) * osc)]
        ]
    });
    addRectangleToBuffers(rectangle);
    // osc = 0.02;
    r = map(sin(frameCount * 0.05), -1, 1, 0, 1);
    rectangle = makeQuad({
        c: [r * 0.5, 1 - r, 1, 1.0],
        v: [
            [0.245 + (Math.sin(t * 0.05) * osc), 0.35 + (Math.cos(t * 0.05) * osc)],
            [0.25 + (Math.sin(t * 0.05) * osc), 0.35 + (Math.cos(t * 0.05) * osc)],
            [0.25 + (Math.sin(t * 0.045) * osc), -0.35 + (Math.cos(t * 0.015) * osc)],
            [0.245 + (Math.sin(t * 0.045) * osc), -0.35 + (Math.cos(t * 0.015) * osc)]
        ]
    });
    addRectangleToBuffers(rectangle);

    // osc = 0.04;
    // rectangle = makeQuad({
    //     c: [0.0, 0.0, 0.0, 1.0],
    //     v: [
    //         [0.245 + (Math.sin(t * 0.05) * osc), 0.35 + (Math.cos(t * 0.05) * osc)],
    //         [0.25 + (Math.sin(t * 0.05) * osc), 0.35 + (Math.cos(t * 0.05) * osc)],
    //         [0.25 + (Math.sin(t * 0.045) * osc), -0.35 + (Math.cos(t * 0.015) * osc)],
    //         [0.245 + (Math.sin(t * 0.045) * osc), -0.35 + (Math.cos(t * 0.015) * osc)]
    //     ]
    // });
    // addRectangleToBuffers(rectangle);

    // var vertices = [-0.75, 0.0, 0.0, -0.5, -0.5, 0.0,
    //     0.75, 0.0, 0.0, 0.5, 0.5, 0.0
    // ];
    // var colors = [0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0];
    // var indices = [3, 2, 1, 3, 1, 0];

    // vertices = rectangle.vertices;
    // colors = rectangle.colors;
    // indices = rectangle.indices;
    // console.log(indices);

    // Create an empty buffer object and store vertex data
    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // Create an empty buffer object and store Index data
    var Index_Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // Create an empty buffer object and store color data
    var color_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    setShaders();
    /* ======== Associating shaders to buffer objects =======*/

    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Bind index buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");

    // point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(coord);

    // bind the color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);

    // get the attribute location
    var color = gl.getAttribLocation(shaderProgram, "color");

    // point attribute to the volor buffer object
    gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);

    // enable the color attribute
    gl.enableVertexAttribArray(color);

    /*============Drawing the Quad====================*/
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.colorMask(false, false, false, true);
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.colorMask(true, true, true, true);
    // gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    //Draw the triangle
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    if (exporting && frameCount < maxFrames) {
        frameExport();
    }
}

function keyPressed() {
    if (keysActive) {
        if (keyCode === 32) {
            if (looping) {
                noLoop();
                looping = false;
            } else {
                loop();
                looping = true;
            }
        }
        if (key == 'p' || key == 'P') {
            frameExport();
        }
        if (key == 'r' || key == 'R') {
            window.location.reload();
        }
        if (key == 'm' || key == 'M') {
            redraw();
        }
    }
}