//Fire-walker
//console.log("Executing Fire Walker Script");
var fireWalker = [];
var fireWalkerProto = {
    img: null,
    size: 100,
    dir: 0,
    maxFrames: 3,
    currentFrame: 0,
    frameIndex: 0,
    scrollCount: 0,
    sourceX: 0,
    sourceY: 0,
    //spawnPoint: 0,
    x: 0,
    y: 600,
    DAMAGE: 1,
    HP: 2,
    SPEED: 9,
    updateAnimation: function () {
        // console.log("current frame: " + this.currentFrame + "frame index: " + this.frameIndex + "sourceX: " + this.sourceX);
        if (this.dir == 0) {
            this.img = fireWalkerImg[0];
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
            this.img = fireWalkerImg[1];
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
        // console.log("Player x: " + player.x + " Firewalker x: " + this.x + " Total Scroll: " + this.scrollCount + " Direction: " + this.dir);
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
                                    //console.log("Firewalker hit right wall");
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
                                    //console.log("Firewalker hit left wall");
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
                                    //console.log("Firewalker hit right wall");
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
                                    // console.log("Firewalker hit left wall");
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
                                // console.log("Firewalker hit right wall");
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
                                // console.log("Firewalker hit left wall");
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

createFireWalkers();

function createFireWalkers() {
    var fireWalkerSpawnpoints = [4100, 5400];
    var newFireWalker;
    //Create the FireWalkers for the level w/ spawn points
    for (var i = 0; i < fireWalkerSpawnpoints.length; i++) {
        newFireWalker = Object.create(fireWalkerProto);
        newFireWalker.spawnPoint = fireWalkerSpawnpoints[i];
        newFireWalker.x = newFireWalker.spawnPoint;
        fireWalker.push(newFireWalker);
    } 
}

//Assign FireWalker images L/R
var fireWalkerImg = [new Image, new Image];
//fireWalkerImg.addEventListener("load", loadHandler, false);
fireWalkerImg[0].src = "./Assets/Enemy/FirePlanet/fireEnemySpriteSheetR.png";
fireWalkerImg[1].src = "./Assets/Enemy/FirePlanet/fireEnemySpriteSheetL.png";
//fireWalker.img = fireWalkerImg;

//function loadHandler() {
    updateFWAnimation();
//}

function updateFWAnimation() {
        setTimeout(updateFWAnimation, 100);
        for (var i = 0; i < fireWalker.length; i ++)
            fireWalker[i].updateAnimation();
    }

function fireWalkerCollision() {
    //console.log("Player hit: " + player.hit);
    //console.log("Player health: " + player.health);
    for (var j = 0; j < fireWalker.length; j++) {
        if ((player.x > fireWalker[j].x - SIZE) && (player.x < fireWalker[j].x + fireWalker[j].size)) {
            //It's within x-range, check y-range
            //console.log("player/fireWalker in x-range..");
            if ((player.y > fireWalker[j].y - fireWalker[j].size) && (player.y < fireWalker[j].y + fireWalker[j].size)) {
                //It's in both ranges so fireWalker and player have collided
                //console.log("player/fireWalker in y-range..");
                if (player.hit === false)
                    reconcileDamage();
            }
        }
        for (var i = 0; i < bulletArray.length; i++) {
            if ((bulletArray[i].x + 10 > fireWalker[j].x) && (bulletArray[i].x < fireWalker[j].x + fireWalker[j].size + 10)) {
                if ((bulletArray[i].y + 10 > fireWalker[j].y) && (bulletArray[i].y < fireWalker[j].y + fireWalker[j].size)) {
                    bulletArray.splice(i, 1);
                    fireWalker[j].HP--
                    enemyIsDamaged.play();
                }
                if (fireWalker[j].HP <= 0)
                    {
                        fireWalker.splice(j, 1);
                        score += 10;
                    }
            }
            //console.log("Firewalker " + j + " HP: " + fireWalker[j].HP);
        }
    }
}

function reconcileDamage(){
    player.health -= fireWalkerProto.DAMAGE;
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

