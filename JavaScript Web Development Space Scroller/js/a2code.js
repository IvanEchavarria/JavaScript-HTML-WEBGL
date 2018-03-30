/**
 * Created by Ivan on 18/03/2017.
 */

//var stage = document.getElementById("stage");
var scorePara = document.querySelector("#score");
var timerPara = document.querySelector("#timer");
var canvas = document.querySelector("canvas");
var surface = canvas.getContext("2d");
var explosionSound = document.getElementById("explosionSnd");
var fireSound = document.getElementById("missileSnd");
var theme = document.getElementById("theme");

const ROWS = 6;
const COLS = 7;
const SIZE = 100;
const SCROLL = 5;
const EASY = 1; // 20% of 700 is 140 since each tile is 100 in size will round to 1.
const NORMAL = 2;// 25% of 700 is 174 since each tile is 100 in size will round to 2.
const HARD = 3;// 30% of 700 is 210 but previous difficulty has 2 so incrementing to 3
const CHAOS = 4;// 35% of 700 is 245 round to 4.

canvas.width = COLS*SIZE;
canvas.height = ROWS*SIZE;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var alienAtk = true;
var alienAlive = false;

var blankSpace ;
var asteroidImg;
var missileImg;
var explosion;
var alienIndex = 0;
var bounce = 0;
var timer = 0;
var score = 0;
var fire = 0;


var map = [];
var alienArr = [];
var ammoArr = [];


var player = {x:3*SIZE, y:5*SIZE , speed:10, dX:0, dY:0, image:null, deathImg:null};

var updateInterval = setInterval(update, 33.34);

// Will call the clock function every second to reflect a timer.
setInterval(clock,1000);

initGame();

function initGame()
{
    var shipImage = new Image();
    explosion = new Image();
    blankSpace = new Image();
    asteroidImg = new Image();
    missileImg = new Image();
    shipImage.src = "assets/img/tekShip.png";
    explosion.src = "assets/img/explosion.png";
    blankSpace.src = "assets/img/Blank.png";
    asteroidImg.src =  "assets/img/asteroid.png";
    missileImg.src = "assets/img/missile.png";
    player.image = shipImage;
    player.deathImg = explosion;
    theme.play();
    generateMap();
    alienBase();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}


function generateMap()
{
    for (var row = 0; row < ROWS + 1 ; row++) // Fill the map with non collision objects to start the game
    {
        map[row] = [];
        for (var col = 0; col < COLS; col++)
        {
            var tempTile = { x:col*SIZE, y:row*SIZE, image:null, collision: false};
            tempTile.image = blankSpace;
            map[row][col] = tempTile;
        }
    }
}

function alienBase()
{
   for(var i = 0; i < 3 ; i++)
   {
       var alien = {x:-SIZE, y:0, speed:5, image:null, collision: true };
       alien.image = new Image();
       alien.image.src = "assets/img/alien"+i+".png";
       alienArr.push(alien);
   }
}

function onKeyDown(event)
{
    switch (event.keyCode)
    {
        case 32: // Space
            if(spacePressed == false)
            {
                spacePressed = true;
            }
            break;
        case 37: // Left
            if(leftPressed == false)
            {
                leftPressed = true;
            }
            break;
        case 65: // Left with A
            if(leftPressed == false)
            {
                leftPressed = true;
            }
            break;
        case 38: // UP
            if(upPressed == false)
            {
                upPressed = true;
            }
            break;
        case 87: // UP With W
            if(upPressed == false)
            {
                upPressed = true;
            }
            break;
        case 39: // Right
            if(rightPressed == false)
            {
                rightPressed = true;
            }
            break;
        case 68: // Right with D
            if(rightPressed == false)
            {
                rightPressed = true;
            }
            break;
        case 40: // Down
            if(downPressed == false)
            {
                downPressed = true;
            }
            break;
        case 83: // Down with S
            if(downPressed == false)
            {
                downPressed = true;
            }
            break;
        default:
            console.log("Unhandled key");
            break;
    }
}

function onKeyUp(event)
{
    switch(event.keyCode)
    {
        case 32: // Space.
            spacePressed = false;
            fire = 0;
            break;
        case 37: // Left.
            leftPressed = false;
            break;
        case 65: // Left A.
            leftPressed = false;
            break;
        case 38: // Up.
            upPressed = false;
            break;
        case 87: // Up W.
            upPressed = false;
            break;
        case 39: // Right.
            rightPressed = false;
            break;
        case 68: // Right D.
            rightPressed = false;
            break;
        case 40: // Down.
            downPressed = false;
            break;
        case 83: // Down S.
            downPressed = false;
            break;
        default:
            console.log("Unhandled key.");
            break;
    }
}

function update()
{
    movePlayer();
    scrollMap();
    moveAliens();
    collision();
    moveMissile();
    render();
}

function movePlayer()
{
    if(leftPressed == true && player.x > 0)
    {
        player.x -= player.speed;
    }
    if(rightPressed == true && player.x < canvas.width - SIZE)
    {
        player.x += player.speed;
    }
    if(upPressed == true && player.y > 0)
    {
        player.y -= player.speed;
    }
    if(downPressed == true && player.y < canvas.height - SIZE)
    {
        player.y += player.speed;
    }
    if(spacePressed == true && fire === 0)
    {
        spacePressed = false;
        fireSound.play();
        fire += timer;
        getMissile();
    }
}

function getMissile()
{
    var missile = {x: player.x, y: player.y + SIZE/6, speed: 10, image: missileImg, collision: true};
    ammoArr.push(missile);
}

function moveMissile()
{
    for( var i = 0; i < ammoArr.length; i++)
    {
        ammoArr[i].y -= ammoArr[i].speed;

        if (ammoArr[i].y < -SIZE || ammoArr[i].collision == false  )
        {
            ammoArr.splice(ammoArr[i],1);
        }
        //  Check if missile has collided with a meteor
        for (var row = 0; row < map.length; row++) //Check every element of the map with nested loops
        {
            for (var col = 0; col < map[row].length; col++) {
                if (map[row][col].collision && ammoArr[i].collision) // Check if this object has a collision attribute
                {   // Check that missile is within range X left and right
                    if (((ammoArr[i].x + SIZE / 6) >= (map[row][col].x + SIZE / 6 - 10) || (ammoArr[i].x + 43) >= (map[row][col].x + SIZE / 6 - 10)) &&
                        (ammoArr[i].x + 43) <= (map[row][col].x + SIZE / 2 + 25)) {
                        if (((ammoArr[i].y + 21) >= (map[row][col].y + SIZE / 6) && (ammoArr[i].y + 21) <= (map[row][col].y + SIZE / 2 + 15))) // check y range
                        {
                            ammoArr[i].image = explosion;
                            ammoArr[i].collision = false;
                            explosionSound.play();
                                                      // ammoArr.splice(ammoArr[i],1);
                            /* map[row][col].collision = false;   // add this to destroy the asteroids with missiles but makes the game too easy.
                             map[row][col].image = blankSpace; */
                        }
                    }
                }
            }
        }
        // Check if the missile has collided with an alien.
        if(ammoArr[i].collision == true)
        {
            if (((ammoArr[i].x + SIZE / 6) >= (alienArr[alienIndex].x) || (ammoArr[i].x + 43) >= (alienArr[alienIndex].x)) &&
                (ammoArr[i].x + 43) <= (alienArr[alienIndex].x + SIZE))
            {
                if (((ammoArr[i].y + 21) >= (alienArr[alienIndex].y) && (ammoArr[i].y + 21) <= (alienArr[alienIndex].y + SIZE ))) // check y range
                {
                    ammoArr[i].image = explosion;
                    ammoArr[i].collision = false;
                    explosionSound.play();
                    score += 10;
                    alienAlive = true;
                }
            }
        }
    }
}


function scrollMap()
{
    for(var row = 0; row < map.length; row++)
    {
        for(var col = 0; col < map[0].length; col++)
        {
            map[row][col].y += SCROLL;
        }
    }
     if (map[map.length-1][map[0].length-1].y  >= canvas.height )// check if the last element in the 2D array has gone off the screen
    {
        var tempRow = []; // create a temporary row to replace the last row of the map that will be taken off
        var counter = 0;
        map.pop(); // Get rid of the last row of the map as it has gone off the screen

        for (var col = 0; col < map[0].length; col++) // Fill the temporary row with non collision objects
        {
                var tempTile = {x: col * SIZE, y: -100, image: null, collision: false};
                tempTile.image = blankSpace;
                tempRow.push(tempTile); // add each new tile to the end of the array
        }

       while ((counter < EASY) && (timer < 30))//if the game is in easy mode then start with 1 meteor per row in a random position
        {
            var xPosition = Math.floor(Math.random()*COLS);  // random position for the new meteor between 0 and COLS
            var tempTileM = {x: xPosition * SIZE, y: -100, image: null, collision: true}; // note this object has attribute collision true
            tempTileM.image = asteroidImg;
            tempRow[xPosition] = tempTileM; // add and replace at random position with the new object
            counter++;
        }
        while ((counter < NORMAL) && (timer > 29 && timer < 50))//if the game is in normal mode then start with 2 meteor per row in a random position
        {
            var xPosition = Math.floor(Math.random()*COLS);  // random position for the new meteor between 0 and COLS
            var tempTileM = {x: xPosition * SIZE, y: -100, image: null, collision: true};
            tempTileM.image = asteroidImg;
            tempRow[xPosition] = tempTileM;
            counter++;
        }
        while ((counter < HARD) && (timer > 49 && timer < 70))//if the game is in hard mode then start with 3 meteor per row in a random position
        {
            var xPosition = Math.floor(Math.random()*COLS);  // random position for the new meteor between 0 and COLS
            var tempTileM = {x: xPosition * SIZE, y: -100, image: null, collision: true};
            tempTileM.image = asteroidImg;
            tempRow[xPosition] = tempTileM;
            counter++;
        }
        while ((counter < CHAOS) && (timer > 69))//if the game is in chaos mode then start with 4 meteor per row in a random position but is unplayable.
        {
            var xPosition = Math.floor(Math.random()*COLS);  // random position for the new meteor between 0 and COLS
            var tempTileM = {x: xPosition * SIZE, y: -100, image: null, collision: true};
            tempTileM.image = asteroidImg;
            tempRow[xPosition] = tempTileM;
            counter++;
        }

        map.unshift(tempRow); // add the new created row at the beginning of the map
    }
}


function clock()
{
  timer++;
}

function moveAliens()
{
    if (alienAtk)
    {
        alienAtk = false;
        alienArr[alienIndex].y = Math.floor(Math.random()*3)* SIZE;
        var xPosition = Math.round(Math.random())*2-1;
        if(xPosition < 0 )
        {
            alienArr[alienIndex].x = -SIZE  ;
        }
        else
        {
            alienArr[alienIndex].x = (COLS + 1)*SIZE ;
            alienArr[alienIndex].speed *= -1;
        }
    }

    if (alienArr[alienIndex].x >= canvas.width - SIZE)// bounce the alien if reaching the end of the canvas
    {
        if(alienArr[alienIndex].speed > 0)
        {
            alienArr[alienIndex].speed *= -1;
            bounce++;
        }
    }
    if(alienArr[alienIndex].x <= 0) // bounce the alien if reaching the beginning of the canvas
    {
        if(alienArr[alienIndex].speed < 0)
        {
            alienArr[alienIndex].speed *= -1;
            bounce++;
        }
    }

    alienArr[alienIndex].x += alienArr[alienIndex].speed;

    if(bounce > 2 || alienAlive) // Let the alien bounce 3 times before erased, so the player can have more chances to hit it.
    {
        alienArr[alienIndex].x = -SIZE;
        var tempAlien = alienArr.shift();
        alienArr.push(tempAlien);
        alienAtk = true;
        bounce = 0;
        alienAlive = false;
    }
}

function collision()
{
   for(var row = 0; row < map.length ; row++) //Check every element of the map with nested loops
   {
       for (var col = 0; col < map[row].length; col++)
       {
           if(map[row][col].collision) // Check if this object has a collision attribute
           {   // Check that player is within range X left and right
               if(((player.x + 60) >= (map[row][col].x + SIZE/6 - 10) || (player.x + 7) >= (map[row][col].x + SIZE/6 - 10)) &&
                                                                                                           (player.x + 7) <= (map[row][col].x + SIZE/2 + 15))
               {// Check if we are within Y's range top and bottom
                   if(((player.y + 5) >= (map[row][col].y + SIZE/6) && (player.y + 5) <= (map[row][col].y + SIZE/2 + 15)) ||
                                                              ((player.y + 88) >= (map[row][col].y + SIZE/6) && (player.y + 88) <= (map[row][col].y + SIZE/2 + 15)))
                   {
                       player.image = player.deathImg;
                       leftPressed = false;
                       rightPressed = false;
                       upPressed = false;
                       downPressed = false;
                       explosionSound.play();
                       setTimeout(endGame, 50);
                   }
               }
           }
       }
   }
    // Check that player is within range X left and right
    if(((player.x + 60) >= (alienArr[alienIndex].x) || (player.x + 7) >= (alienArr[alienIndex].x)) &&
            (player.x + 7) <= (alienArr[alienIndex].x + SIZE))
    {// Check if we are within Y's range top and bottom
        if((player.y + 5) >= (alienArr[alienIndex].y) && (player.y + 5) <= (alienArr[alienIndex].y + SIZE/2))
        {
            player.image = player.deathImg;
            leftPressed = false;
            rightPressed = false;
            upPressed = false;
            downPressed = false;
            explosionSound.play();
            setTimeout(endGame, 50);
        }
    }
}

function endGame()
{
    clearInterval(updateInterval);
    alert("You have crashed!, you couldn't save the galaxy and everyone you love is going to die on Earth..."); // GAME OVER MESSAGE
}

function render()
{
    surface.clearRect(0, 0, canvas.width, canvas.height); // x, y, w, h
    // Render map...
    for (var row = 0; row < map.length; row++)
    {
        for (var col = 0; col < map[0].length; col++)
        {
            if (map[row][col].image != null)
                surface.drawImage(map[row][col].image, map[row][col].x, map[row][col].y);
        }
    }
    // Render Enemy...
    surface.drawImage(alienArr[alienIndex].image, alienArr[alienIndex].x , alienArr[alienIndex].y);

    //Render missile...
    for(var i = 0; i < ammoArr.length; i++)
    {
        surface.drawImage(ammoArr[i].image, ammoArr[i].x, ammoArr[i].y);
    }

    // Render player...
    surface.drawImage(player.image, player.x, player.y);

    // Render score..
    surface.fillText(scorePara.innerHTML = "Score:  " + score, 0, 0);

    //Render Timer..
    surface.fillText(timerPara.innerHTML = "Timer: " + timer, 0, 0 );

    //Collision box for testing
   /* surface.beginPath();
    surface.lineWidth = "3";
    surface.strokeStyle = "green";
    surface.rect( alienArr[alienIndex].x, alienArr[alienIndex].y , SIZE , SIZE);
    surface.stroke();*/
}







