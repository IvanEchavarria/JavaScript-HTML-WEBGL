"use strict";

var gl;

var canvas;

var shaderProgram;

var floorVertexPositionBuffer;

var floorVertexIndexBuffer;

var cubeVertexPositionBuffer;

var cubeVertexIndexBuffer;

var tableLegOneVertexPositionBuffer;
var tableLegOneVertexIndexBuffer;

var tableLegSecondVertexPositionBuffer;
var tableLegSecondVertexIndexBuffer;

var tableLegThirdVertexPositionBuffer;
var tableLegThirdVertexIndexBuffer;

var tableLegFourthVertexPositionBuffer;
var tableLegFourthVertexIndexBuffer;

var tableTopVertexPositionBuffer;
var tableTopVertexIndexBuffer;


var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 1;
var theta = [0, 0, 0];

var thetaLoc;

var fovy = 70;
var near = 0.1;
var far = 100;
var aspect;
var toggle = true;


var modelViewMatrix;

var projectionMatrix;

var modelViewMatrixStack;



window.onload = function init()

{

  canvas = document.getElementById( "gl-canvas" );

  gl = WebGLDebugUtils.makeDebugContext(createGLContext(canvas));

  setupShaders();

  setupBuffers();

  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  gl.enable(gl.DEPTH_TEST);

  thetaLoc = gl.getUniformLocation(shaderProgram, "theta");

    aspect = gl.viewportWidth / gl.viewportHeight;

    //event listeners for buttons

    document.getElementById("xButton").onclick = function () {
        axis = xAxis;
    };
    document.getElementById("yButton").onclick = function () {
        axis = yAxis;
    };
    document.getElementById("zButton").onclick = function () {
        axis = zAxis;
    };

    document.getElementById("toggle").onclick = function () {

        if(toggle)
            toggle = false;
        else
        {
            toggle = true;
            draw();
        }
    };

    document.getElementById("FOVY").oninput = function () {
        fovy = this.value;
        
    };

    document.getElementById("AspectRatio").oninput = function () {
        
        
        aspect = this.value;
        
    };


  draw();

}



function createGLContext(canvas) {

  var names = ["webgl", "experimental-webgl"];

  var context = null;

  for (var i=0; i < names.length; i++) {

    try {

      context = canvas.getContext(names[i]);

    } catch(e) {}

    if (context) {

      break;

    }

  }

  if (context) {

    context.viewportWidth = canvas.width;

    context.viewportHeight = canvas.height;

  } else {

    alert("Failed to create WebGL context!");

  }

  return context;

}





function setupShaders() {

  //

  //  Load shaders and initialize attribute buffers

  //

  shaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );

  gl.useProgram( shaderProgram );



  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");

  shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");

  shaderProgram.uniformMVMatrix = gl.getUniformLocation(shaderProgram, "uMVMatrix");

  shaderProgram.uniformProjMatrix = gl.getUniformLocation(shaderProgram, "uPMatrix");



  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);



  modelViewMatrix = mat4.create();

  projectionMatrix = mat4.create();

  modelViewMatrixStack = [];

}





function setupFloorBuffers() {

  floorVertexPositionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexPositionBuffer);



  var floorVertexPosition = [

      // Plane in y=0

       0.0,   0.0,  0.0,  //v0

       0.0,   0.0, -3.0,  //v1

      -3.0,   0.0, -3.0,  //v2

      -3.0,   0.0,  0.0]; //v3



  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(floorVertexPosition),

                gl.STATIC_DRAW);



  floorVertexPositionBuffer.itemSize = 3;

  floorVertexPositionBuffer.numberOfItems = 4;



  floorVertexIndexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, floorVertexIndexBuffer);

  var floorVertexIndices = [0, 1, 2, 3];



  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(floorVertexIndices),

                gl.STATIC_DRAW);

  floorVertexIndexBuffer.itemSize = 1;

  floorVertexIndexBuffer.numberOfItems = 4;

}

function setupTableBuffers()
{

    tableLegOneVertexPositionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, tableLegOneVertexPositionBuffer);

    var tableLegOneVertexPosition =
        [
            // Back face

            -1.95,  0.4,  -2.55, //v0

            -2.0,  0.4,  -2.55, //v1

            -2.0, 0.0,  -2.55, //v2

            -1.95, 0.0,  -2.55, //v3



            // Front face

            -1.95,  0.4, -2.6, //v4

            -2.0,  0.4, -2.6, //v5

            -2.0, 0.0, -2.6, //v6

            -1.95, 0.0, -2.6, //v7



            // Right face

            -2.0,  0.4,  -2.55, //v8

            -2.0,  0.4, -2.6, //v9

            -2.0, 0.0, -2.6, //v10

            -2.0, 0.0,  -2.55, //v11



            // Left face

            -1.95,  0.4,  -2.55, //12

            -1.95, 0.0,  -2.55, //13

            -1.95, 0.0, -2.6, //14

            -1.95,  0.4, -2.6, //15



            // Top face

            -1.95,  0.4,  -2.55, //v16

            -1.95,  0.4, -2.6, //v17

            -2.0,  0.4, -2.6, //v18

            -2.0,  0.4,  -2.55, //v19



            // Bottom face

            -1.95, 0.0,  -2.55, //v20

            -1.95, 0.0, -2.6, //v21

            -2.0, 0.0, -2.6, //v22

            -2.0, 0.0,  -2.55, //v23

        ];


    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tableLegOneVertexPosition),

        gl.STATIC_DRAW);

    tableLegOneVertexPositionBuffer.itemSize = 3;

    tableLegOneVertexPositionBuffer.numberOfItems = 24;



    tableLegOneVertexIndexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tableLegOneVertexIndexBuffer);

    var tableLegVertexIndices = [

        0, 1, 2,      0, 2, 3,    // Front face

        4, 6, 5,      4, 7, 6,    // Back face

        8, 9, 10,     8, 10, 11,  // Left face

        12, 13, 14,   12, 14, 15, // Right face

        16, 17, 18,   16, 18, 19, // Top face

        20, 22, 21,   20, 23, 22  // Bottom face

    ];

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tableLegVertexIndices),

        gl.STATIC_DRAW);

    tableLegOneVertexIndexBuffer.itemSize = 1;

    tableLegOneVertexIndexBuffer.numberOfItems = 36;

    //****Second Leg*******


    tableLegSecondVertexPositionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, tableLegSecondVertexPositionBuffer);

    var tableLegTwoVertexPosition =
        [
            // Back face

            -1.95,  0.4,  -1.55, //v0

            -2.0,  0.4,  -1.55, //v1

            -2.0, 0.0,  -1.55, //v2

            -1.95, 0.0,  -1.55, //v3



            // Front face

            -1.95,  0.4, -1.6, //v4

            -2.0,  0.4, -1.6, //v5

            -2.0, 0.0, -1.6, //v6

            -1.95, 0.0, -1.6, //v7



            // Right face

            -2.0,  0.4,  -1.55, //v8

            -2.0,  0.4, -1.6, //v9

            -2.0, 0.0, -1.6, //v10

            -2.0, 0.0,  -1.55, //v11



            // Left face

            -1.95,  0.4,  -1.55, //12

            -1.95, 0.0,  -1.55, //13

            -1.95, 0.0, -1.6, //14

            -1.95,  0.4, -1.6, //15



            // Top face

            -1.95,  0.4,  -1.55, //v16

            -1.95,  0.4, -1.6, //v17

            -2.0,  0.4, -1.6, //v18

            -2.0,  0.4,  -1.55, //v19



            // Bottom face

            -1.95, 0.0,  -1.55, //v20

            -1.95, 0.0, -1.6, //v21

            -2.0, 0.0, -1.6, //v22

            -2.0, 0.0,  -1.55, //v23

        ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tableLegTwoVertexPosition),

        gl.STATIC_DRAW);


    tableLegSecondVertexPositionBuffer.itemSize = 3;

    tableLegSecondVertexPositionBuffer.numberOfItems = 24;

    tableLegSecondVertexIndexBuffer=gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tableLegSecondVertexIndexBuffer);


    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tableLegVertexIndices),

        gl.STATIC_DRAW);

    tableLegSecondVertexIndexBuffer.itemSize = 1;

    tableLegSecondVertexIndexBuffer.numberOfItems = 36;

    //****Third Leg*******


    tableLegThirdVertexPositionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, tableLegThirdVertexPositionBuffer);

    var tableLegThreeVertexPosition =
        [
            // Back face

            -0.95,  0.4,  -1.55, //v0

            -1.0,  0.4,  -1.55, //v1

            -1.0, 0.0,  -1.55, //v2

            -0.95, 0.0,  -1.55, //v3



            // Front face

            -0.95,  0.4, -1.6, //v4

            -1.0,  0.4, -1.6, //v5

            -1.0, 0.0, -1.6, //v6

            -0.95, 0.0, -1.6, //v7



            // Right face

            -1.0,  0.4,  -1.55, //v8

            -1.0,  0.4, -1.6, //v9

            -1.0, 0.0, -1.6, //v10

            -1.0, 0.0,  -1.55, //v11



            // Left face

            -0.95,  0.4,  -1.55, //12

            -0.95, 0.0,  -1.55, //13

            -0.95, 0.0, -1.6, //14

            -0.95,  0.4, -1.6, //15



            // Top face

            -0.95,  0.4,  -1.55, //v16

            -0.95,  0.4, -1.6, //v17

            -1.0,  0.4, -1.6, //v18

            -1.0,  0.4,  -1.55, //v19



            // Bottom face

            -0.95, 0.0,  -1.55, //v20

            -0.95, 0.0, -1.6, //v21

            -1.0, 0.0, -1.6, //v22

            -1.0, 0.0,  -1.55, //v23

        ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tableLegThreeVertexPosition),

        gl.STATIC_DRAW);


    tableLegThirdVertexPositionBuffer.itemSize = 3;

    tableLegThirdVertexPositionBuffer.numberOfItems = 24;

    tableLegThirdVertexIndexBuffer=gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tableLegThirdVertexIndexBuffer);


    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tableLegVertexIndices),

        gl.STATIC_DRAW);

    tableLegThirdVertexIndexBuffer.itemSize = 1;

    tableLegThirdVertexIndexBuffer.numberOfItems = 36;



    //****Fourth Leg*******


    tableLegFourthVertexPositionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, tableLegFourthVertexPositionBuffer);

    var tableLegFourVertexPosition =
        [
            // Back face

            -0.95,  0.4,  -2.55, //v0

            -1.0,  0.4,  -2.55, //v1

            -1.0, 0.0,  -2.55, //v2

            -0.95, 0.0,  -2.55, //v3



            // Front face

            -0.95,  0.4, -2.6, //v4

            -1.0,  0.4, -2.6, //v5

            -1.0, 0.0, -2.6, //v6

            -0.95, 0.0, -2.6, //v7



            // Right face

            -1.0,  0.4,  -2.55, //v8

            -1.0,  0.4, -2.6, //v9

            -1.0, 0.0, -2.6, //v10

            -1.0, 0.0,  -2.55, //v11



            // Left face

            -0.95,  0.4,  -2.55, //12

            -0.95, 0.0,  -2.55, //13

            -0.95, 0.0, -2.6, //14

            -0.95,  0.4, -2.6, //15



            // Top face

            -0.95,  0.4,  -2.55, //v16

            -0.95,  0.4, -2.6, //v17

            -1.0,  0.4, -2.6, //v18

            -1.0,  0.4,  -2.55, //v19



            // Bottom face

            -0.95, 0.0,  -2.55, //v20

            -0.95, 0.0, -2.6, //v21

            -1.0, 0.0, -2.6, //v22

            -1.0, 0.0,  -2.55, //v23

        ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tableLegFourVertexPosition),

        gl.STATIC_DRAW);


    tableLegFourthVertexPositionBuffer.itemSize = 3;

    tableLegFourthVertexPositionBuffer.numberOfItems = 24;

    tableLegFourthVertexIndexBuffer=gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tableLegFourthVertexIndexBuffer);


    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tableLegVertexIndices),

        gl.STATIC_DRAW);

    tableLegFourthVertexIndexBuffer.itemSize = 1;

    tableLegFourthVertexIndexBuffer.numberOfItems = 36;


    //****Table TOP*******


    tableTopVertexPositionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, tableTopVertexPositionBuffer);

    var tableTopVertexPosition =
        [
            // Back face

            -0.95,  0.45,  -1.55, //v0

            -2.0,  0.45,  -1.55, //v1

            -2.0, 0.4,  -1.55, //v2

            -0.95, 0.4,  -1.55, //v3



            // Front face

            -0.95,  0.45, -2.6, //v4

            -2.0,  0.45, -2.6, //v5

            -2.0, 0.4, -2.6, //v6

            -0.95, 0.4, -2.6, //v7



            // Right face

            -2.0,  0.45,  -1.55, //v8

            -2.0,  0.45, -2.6, //v9

            -2.0, 0.4, -2.6, //v10

            -2.0, 0.4,  -1.55, //v11



            // Left face

            -0.95,  0.45,  -1.55, //12

            -0.95, 0.4,  -1.55, //13

            -0.95, 0.4, -2.6, //14

            -0.95,  0.45, -2.6, //15



            // Top face

            -0.95,  0.45,  -1.55, //v16

            -0.95,  0.45, -2.6, //v17

            -2.0,  0.45, -2.6, //v18

            -2.0,  0.45,  -1.55, //v19



            // Bottom face

            -0.95, 0.4,  -1.55, //v20

            -0.95, 0.4, -2.6, //v21

            -2.0, 0.4, -2.6, //v22

            -2.0, 0.4,  -1.55, //v23

        ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tableTopVertexPosition),

        gl.STATIC_DRAW);


    tableTopVertexPositionBuffer.itemSize = 3;

    tableTopVertexPositionBuffer.numberOfItems = 24;

    tableTopVertexIndexBuffer=gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tableTopVertexIndexBuffer);


    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tableLegVertexIndices),

        gl.STATIC_DRAW);

    tableTopVertexIndexBuffer.itemSize = 1;

    tableTopVertexIndexBuffer.numberOfItems = 36;
}



function setupCubeBuffers() {

  cubeVertexPositionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);



  var cubeVertexPosition = [

       // Front face

      -1.45,  0.7,  -2.05, //v0

      -1.75, 0.7,  -2.05, //v1

      -1.75, 0.4,  -2.05, //v2

      -1.45,  0.4,  -2.05, //v3



      // Front face

      -1.45,  0.7, -2.35, //v4

      -1.75,  0.7, -2.35, //v5

      -1.75,  0.4, -2.35, //v6

      -1.45,  0.4, -2.35, //v7



      // Right face

      -1.75, 0.7,  -2.05, //v8

      -1.75,  0.7, -2.35, //v9

      -1.75,  0.4, -2.35, //v10

      -1.75, 0.4,  -2.05, //v11



      // Left face

      -1.45,  0.7,  -2.05, //12

      -1.45,  0.4,  -2.05, //13

      -1.45,  0.4, -2.35, //14

      -1.45,  0.7, -2.35, //15



      // Top face

      -1.45,  0.7,  -2.05, //v16

      -1.45,  0.7, -2.35, //v17

      -1.75,  0.7, -2.35, //v18

      -1.75, 0.7,  -2.05, //v19



      // Bottom face

      -1.45,  0.4,  -2.05, //v20

      -1.45,  0.4, -2.35, //v21

      -1.75,  0.4, -2.35, //v22

      -1.75, 0.4,  -2.05, //v23

  ];



  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertexPosition),

                gl.STATIC_DRAW);

  cubeVertexPositionBuffer.itemSize = 3;

  cubeVertexPositionBuffer.numberOfItems = 24;



  cubeVertexIndexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);

  var cubeVertexIndices = [

            0, 1, 2,      0, 2, 3,    // Front face

            4, 6, 5,      4, 7, 6,    // Back face

            8, 9, 10,     8, 10, 11,  // Left face

            12, 13, 14,   12, 14, 15, // Right face

            16, 17, 18,   16, 18, 19, // Top face

            20, 22, 21,   20, 23, 22  // Bottom face

        ];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices),

                gl.STATIC_DRAW);

  cubeVertexIndexBuffer.itemSize = 1;

  cubeVertexIndexBuffer.numberOfItems = 36;

}





function setupBuffers() {

  setupFloorBuffers();

  setupCubeBuffers();

  setupTableBuffers();

}



function uploadModelViewMatrixToShader() {

  //upload your transformation matrices to the GPU before they can be used to do any transformations in the vertex shader

  //the second argument specifies whether you want to transpose the columns that are uploaded

  gl.uniformMatrix4fv(shaderProgram.uniformMVMatrix, false, modelViewMatrix);

}



function uploadProjectionMatrixToShader() {

  gl.uniformMatrix4fv(shaderProgram.uniformProjMatrix,false, projectionMatrix);

}



function drawFloor(r,g,b,a) {

  // Disable vertex attrib array and use constant color for the floor.

  gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);

  // Set color

  gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, r, g, b, a);



  // Draw the floor

  gl.bindBuffer(gl.ARRAY_BUFFER, floorVertexPositionBuffer);

  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,

                         floorVertexPositionBuffer.itemSize,

                         gl.FLOAT, false, 0, 0);



  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, floorVertexIndexBuffer);

  gl.drawElements(gl.TRIANGLE_FAN, floorVertexIndexBuffer.numberOfItems,

                  gl.UNSIGNED_SHORT, 0);

}



function drawTable(r,g,b,a) {

  // Disable vertex attrib array and use constant color for the cube.

  gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);

  // Set color

  gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, r, g, b, a);



  gl.bindBuffer(gl.ARRAY_BUFFER, tableLegOneVertexPositionBuffer);

  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,

      tableLegOneVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);



  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tableLegOneVertexIndexBuffer);



  gl.drawElements(gl.TRIANGLES, tableLegOneVertexIndexBuffer.numberOfItems,

                  gl.UNSIGNED_SHORT, 0);

  //2nd leg

    gl.bindBuffer(gl.ARRAY_BUFFER, tableLegSecondVertexPositionBuffer);

    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,

        tableLegSecondVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tableLegSecondVertexIndexBuffer);



    gl.drawElements(gl.TRIANGLES, tableLegSecondVertexIndexBuffer.numberOfItems,

        gl.UNSIGNED_SHORT, 0);

    //3rd Leg

    gl.bindBuffer(gl.ARRAY_BUFFER, tableLegThirdVertexPositionBuffer);

    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,

        tableLegThirdVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tableLegThirdVertexIndexBuffer);



    gl.drawElements(gl.TRIANGLES, tableLegThirdVertexIndexBuffer.numberOfItems,

        gl.UNSIGNED_SHORT, 0);

    //4th Leg
    gl.bindBuffer(gl.ARRAY_BUFFER, tableLegFourthVertexPositionBuffer);

    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,

        tableLegFourthVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tableLegFourthVertexIndexBuffer);



    gl.drawElements(gl.TRIANGLES, tableLegFourthVertexIndexBuffer.numberOfItems,

        gl.UNSIGNED_SHORT, 0);

    //Top
    gl.bindBuffer(gl.ARRAY_BUFFER, tableTopVertexPositionBuffer);

    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,

        tableTopVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tableTopVertexIndexBuffer);



    gl.drawElements(gl.TRIANGLES, tableTopVertexIndexBuffer.numberOfItems,

        gl.UNSIGNED_SHORT, 0);



}

function drawCube(r,g,b,a) {

    // Disable vertex attrib array and use constant color for the cube.

    gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);

    // Set color

    gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, r, g, b, a);



    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);

    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,

        cubeVertexPositionBuffer.itemSize,

        gl.FLOAT, false, 0, 0);



    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);



    gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numberOfItems,

        gl.UNSIGNED_SHORT, 0);



}




function draw() {

  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  theta[axis] += 2.0;
  
  gl.uniform3fv(thetaLoc, theta);

  mat4.perspective(fovy, aspect, near, far, projectionMatrix);

  //field of view of 70 degrees, a near plane 0.1 units in front of the viewer and a far plane of 100 units from the viewer

  //mat4.perspective(70, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, projectionMatrix);

  mat4.identity(modelViewMatrix); //load the identity matrix to modelViewMatrix



  //the view transform: the viewer is located at the position (8,5,10)

  //the view direction is towards the origin (0,0,0)

  //the up direction is positive y-axis (0,1,0)

  //what happens if you change -8 to 8?

  mat4.lookAt([-8, 5, -10],[0, 0, 0], [0, 1,0], modelViewMatrix);



  uploadModelViewMatrixToShader();

  uploadProjectionMatrixToShader();

  // Draw floor in red color

 



  // Draw box

  pushModelViewMatrix();

  mat4.translate(modelViewMatrix, [0.0, 2.7 ,0.0], modelViewMatrix);

  mat4.scale(modelViewMatrix, [2.5, 2.5, 2.5], modelViewMatrix);



  uploadModelViewMatrixToShader();


  drawFloor(1.0, 0.0, 0.0, 1.0);
  
  drawTable(0.85, 0.74, 0.43, 1.0);

  drawCube(0.0, 0.0, 1.0, 1.0);
  
  


  popModelViewMatrix();
  
  if(toggle)
    requestAnimFrame(draw);

}



function pushModelViewMatrix() {

  var copyToPush = mat4.create(modelViewMatrix);

  modelViewMatrixStack.push(copyToPush);

}



function popModelViewMatrix() {

  if (modelViewMatrixStack.length == 0) {

    throw "Error popModelViewMatrix() - Stack was empty ";

  }

  modelViewMatrix = modelViewMatrixStack.pop();

}
