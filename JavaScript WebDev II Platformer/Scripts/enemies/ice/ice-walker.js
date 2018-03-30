//Ice-walker
//console.log("Executing Ice Walker Script");
var iceWalker = [];
//Assign iceWalker images L/R
var iceWalkerImg = [new Image, new Image];
//iceWalkerImg.addEventListener("load", loadHandler, false);
iceWalkerImg[0].src = "./Assets/Enemy/IcePlanet/IceHumanoidSpriteR.png";
iceWalkerImg[1].src = "./Assets/Enemy/IcePlanet/IceHumanoidSpriteL.png";

var iceWalkerProto = {
    img: null,
    size: 100,
    dir: 0,
    maxFrames: 3,
    currentFrame: 0,
    frameIndex: 0,
    scrollCount: 0,
    sourceX: 0,
    sourceY: 0,
    spawnPointX: 0,
    spawnPointY: 0,
    x: 8400,
    y: 600,
    DAMAGE: 2,
    HP: 3,
    SPEED: 10,
    updateAnimation: function () {
        // console.log("current frame: " + this.currentFrame + "frame index: " + this.frameIndex + "sourceX: " + this.sourceX);
        if (this.dir == 0) {
            this.img = iceWalkerImg[0];
            this.currentFrame++;
            if (this.currentFrame == this.maxFrames) {
                this.frameIndex++;
                this.currentFrame = 0;
                if (this.frameIndex == 4)
                    this.frameIndex = 0;
                this.sourceX = this.frameIndex * this.size;
            }
        }
        else {
            this.img = iceWalkerImg[1];
            this.currentFrame++;
            if (this.currentFrame == this.maxFrames) {
                this.frameIndex++;
                this.currentFrame = 0;
                if (this.frameIndex == 4)
                    this.frameIndex = 0;
                this.sourceX = this.frameIndex * this.size;
            }
        }
    },
    move: function () {
        //console.log("Player x: " + player.x + " iceWalker x: " + this.x + " Total Scroll: " + this.scrollCount + " Direction: " + this.dir);
        var netSpeed;
        if (isPressed == true) {
            if (player.x >= 300 || (end == true && player.x > 1300)) {
                netSpeed = this.SPEED - WORLDSPEED;
                this.scrollCount += WORLDSPEED;
                if (this.dir == 0) {
                    this.x += netSpeed;
                    //this.spawnPoint -= 8;
                    for (var r = 0; r < map.length; r++) {
                        for (var c = 0; c < map[0].length; c++) {
                            if (map[r][c].aRock === true && ((this.x + this.size > map[r][c].x) && (this.x + this.size <= map[r][c].x + 20))) {
                                if ((this.y + this.size > map[r][c].y) && (this.y < map[r][c].y + SIZE)) {
                                    //console.log("iceWalker hit right wall");
                                    //if (this.x >= this.spawnPoint + 300)
                                    this.dir = 1;
                                }
                            }
                        }
                    }
                }
                else {
                    netSpeed = this.SPEED + WORLDSPEED;
                    this.x -= netSpeed;
                    //this.spawnPoint -= 8;
                    for (var r = 0; r < map.length; r++) {
                        for (var c = 0; c < map[0].length; c++) {
                            if (map[r][c].aRock === true && ((this.x < map[r][c].x + SIZE) && (this.x >= map[r][c].x + SIZE - 20))) {
                                if ((this.y + this.size > map[r][c].y) && (this.y < map[r][c].y + SIZE)) {
                                    //console.log("iceWalker hit left wall");
                                    //if (this.x >= this.spawnPoint + 300)
                                    this.dir = 0;
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (this.dir == 0) {
                    this.x += this.SPEED;
                    //if (this.x >= this.spawnPoint + 295)
                    for (var r = 0; r < map.length; r++) {
                        for (var c = 0; c < map[0].length; c++) {
                            if (map[r][c].aRock === true && ((this.x + this.size > map[r][c].x) && (this.x + this.size <= map[r][c].x + 20))) {
                                if ((this.y + this.size > map[r][c].y) && (this.y < map[r][c].y + SIZE)) {
                                    //console.log("iceWalker hit right wall");
                                    //if (this.x >= this.spawnPoint + 300)
                                    this.dir = 1;
                                }
                            }
                        }
                    }
                }
                else {
                    this.x -= this.SPEED;
                    //if (this.x < this.spawnPoint)
                    for (var r = 0; r < map.length; r++) {
                        for (var c = 0; c < map[0].length; c++) {
                            if (map[r][c].aRock === true && ((this.x < map[r][c].x + SIZE) && (this.x >= map[r][c].x + SIZE - 20))) {
                                if ((this.y + this.size > map[r][c].y) && (this.y < map[r][c].y + SIZE)) {
                                    // console.log("iceWalker hit left wall");
                                    //if (this.x >= this.spawnPoint + 300)
                                    this.dir = 0;
                                }
                            }
                        }
                    }
                }
            }
        }
        else if (isPressed == false) {
            if (this.dir == 0) {
                this.x += this.SPEED;
                //if (this.x >= this.spawnPoint + 300)
                for (var r = 0; r < map.length; r++) {
                    for (var c = 0; c < map[0].length; c++) {
                        if (map[r][c].aRock === true && ((this.x + this.size > map[r][c].x) && (this.x + this.size <= map[r][c].x + 20))) {
                            if ((this.y + this.size > map[r][c].y) && (this.y < map[r][c].y + SIZE)) {
                                // console.log("iceWalker hit right wall");
                                //if (this.x >= this.spawnPoint + 300)
                                this.dir = 1;
                            }
                        }
                    }
                }
            }
            else {
                this.x -= this.SPEED;
                //if (this.x < this.spawnPoint)
                for (var r = 0; r < map.length; r++) {
                    for (var c = 0; c < map[0].length; c++) {
                        if (map[r][c].aRock === true && ((this.x < map[r][c].x + SIZE) && (this.x >= map[r][c].x + SIZE - 20))) {
                            if ((this.y + this.size > map[r][c].y) && (this.y < map[r][c].y + SIZE)) {
                                // console.log("iceWalker hit left wall");
                                //if (this.x >= this.spawnPoint + 300)
                                this.dir = 0;
                            }
                        }
                    }
                }
            }
        }
    }
};

//createIceWalkers();

function createIceWalkers() {
    var iceWalkerSpawnpointsX = [ 4800,  7600,  8300, 12800, 15100, 15900, 17600, 21800];
    var iceWalkerSpawnpointsY = [  600,   600,   600,   600,   500,   600,   600,   600];
    var newiceWalker;
    //Create the iceWalkers for the level w/ spawn points
    for (var i = 0; i < iceWalkerSpawnpointsX.length; i++) {
        newiceWalker = Object.create(iceWalkerProto);
        newiceWalker.spawnPointX = iceWalkerSpawnpointsX[i];
        newiceWalker.spawnPointY = iceWalkerSpawnpointsY[i];
        newiceWalker.x = newiceWalker.spawnPointX;
        newiceWalker.y = newiceWalker.spawnPointY;
        iceWalker.push(newiceWalker);
    } 
}


//iceWalker.img = iceWalkerImg;

//function loadHandler() {
    updateIWAnimation();
//}

function updateIWAnimation() {
        setTimeout(updateIWAnimation, 100);
        for (var i = 0; i < iceWalker.length; i ++)
            iceWalker[i].updateAnimation();
    }

function iceWalkerCollision() {
    //console.log("Player hit: " + player.hit);
    //console.log("Player health: " + player.health);
    for (var j = 0; j < iceWalker.length; j++) {
        if ((player.x > iceWalker[j].x - SIZE) && (player.x < iceWalker[j].x + iceWalker[j].size)) {
            //It's within x-range, check y-range
            //console.log("player/iceWalker in x-range..");
            if ((player.y > iceWalker[j].y - iceWalker[j].size) && (player.y < iceWalker[j].y + iceWalker[j].size)) {
                //It's in both ranges so iceWalker and player have collided
                //console.log("player/iceWalker in y-range..");
                if (player.hit === false)
                    reconcileDamage();
            }
        }
        for (var i = 0; i < bulletArray.length; i++) {
            if ((bulletArray[i].x + 10 > iceWalker[j].x) && (bulletArray[i].x < iceWalker[j].x + iceWalker[j].size + 10)) {
                if ((bulletArray[i].y + 10 > iceWalker[j].y) && (bulletArray[i].y < iceWalker[j].y + iceWalker[j].size)) {
                    bulletArray.splice(i, 1);
                    iceWalker[j].HP--
                    enemyIsDamaged.play();
                }
                if (iceWalker[j].HP <= 0)
                   {
                     iceWalker.splice(j, 1);
                     score += 10;
                   }
            }
            //console.log("iceWalker " + j + " HP: " + iceWalker[j].HP);
        }
    }
}

function reconcileDamage(){
    player.health -= iceWalkerProto.DAMAGE;
    drain();
    player.hit = true;
    setTimeout(playerRecovered, 2000);
}

function playerRecovered(){
    //console.log("recovered...");
    player.hit = false;
    flashCount = 0;
}

function endGame()
    {
       // clearInterval(idInt);
       // clearInterval(idInt2);
       // clearInterval(idInt3);
       // window.alert("Game over!")
    }

