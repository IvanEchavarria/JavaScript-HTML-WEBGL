//console.log("Executing iceBear script...");
var iceBear = [];
var iceBearProto = {
    img: null,
    size: 100,
    dir: 0, //pointing left
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
    DAMAGE: 1,
    HP: 2,
    SPEED: 8,
    updateAnimation: function() {
       // console.log("current frame: " + this.currentFrame + "frame index: " + this.frameIndex + "sourceX: " + this.sourceX);
        if (this.dir == 0){
            this.img = iceBearImg[0];
            this.currentFrame++;
            if (this.currentFrame == this.maxFrames){
                this.frameIndex++;
                this.currentFrame = 0;
                if (this.frameIndex == 4)
                    this.frameIndex = 0;
                this.sourceX = this.frameIndex * this.size;
            }
        }
        else {
            this.img = iceBearImg[1];
            this.currentFrame++;
            if (this.currentFrame == this.maxFrames)
            {
                this.frameIndex++;
                this.currentFrame = 0;
                if (this.frameIndex == 4)
                    this.frameIndex = 0;
                this.sourceX = this.frameIndex * this.size;
            }
        }
    },
    move: function () {
       // console.log("Player x: " + player.x + " iceBear x: " + this.x + " Total Scroll: " + this.scrollCount + " Direction: " + this.dir);
        var netSpeed;
        if (isPressed == true) {
            if (player.x >= 300 || (end == true && player.x > 1300)) {
                netSpeed = this.SPEED - WORLDSPEED;
                this.scrollCount += 8;
                if (this.dir == 0) {
                    this.x += netSpeed;
                    //this.spawnPoint -= 8;
                    for (var r =0; r < map.length ; r++) {
		                for (var c =0 ; c < map[0].length ; c ++) {
			                if (map[r][c].aRock === true && ((this.x + this.size > map[r][c].x) && (this.x + this.size <= map[r][c].x + 20))) {
                                if ((this.y + this.size > map[r][c].y) && (this.y < map[r][c].y + SIZE)){
                                    //console.log("iceBear hit right wall");
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
                    for (var r =0; r < map.length ; r++) {
		                for (var c =0 ; c < map[0].length ; c ++) {
			                if (map[r][c].aRock === true && ((this.x < map[r][c].x + SIZE) && (this.x >= map[r][c].x + SIZE - 20))) {
                                if ((this.y + this.size > map[r][c].y) && (this.y < map[r][c].y + SIZE)){
                                    //console.log("iceBear hit left wall");
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
                    for (var r =0; r < map.length ; r++) {
		                for (var c =0 ; c < map[0].length ; c ++) {
			                if (map[r][c].aRock === true && ((this.x + this.size > map[r][c].x) && (this.x + this.size <= map[r][c].x + 20))) {
                                if ((this.y + this.size > map[r][c].y) && (this.y < map[r][c].y + SIZE)){
                                    //console.log("iceBear hit right wall");
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
                    for (var r =0; r < map.length ; r++) {
		                for (var c =0 ; c < map[0].length ; c ++) {
			                if (map[r][c].aRock === true && ((this.x < map[r][c].x + SIZE) && (this.x >= map[r][c].x + SIZE - 20))) {
                                if ((this.y + this.size > map[r][c].y) && (this.y < map[r][c].y + SIZE)){
                                   // console.log("iceBear hit left wall");
                                    //if (this.x >= this.spawnPoint + 300)
                                    this.dir = 0;
                                }           
                            }
                        }
                    }
                }
            }        
        }
        else if (isPressed == false){
            if (this.dir == 0) {
                this.x += this.SPEED;
                //if (this.x >= this.spawnPoint + 300)
                for (var r = 0; r < map.length; r++) {
                    for (var c = 0; c < map[0].length; c++) {
                        if (map[r][c].aRock === true && ((this.x + this.size > map[r][c].x) && (this.x + this.size <= map[r][c].x + 20))) {
                            if ((this.y + this.size > map[r][c].y) && (this.y < map[r][c].y + SIZE)){
                               // console.log("iceBear hit right wall");
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
                            if ((this.y + this.size > map[r][c].y) && (this.y < map[r][c].y + SIZE)){
                               // console.log("iceBear hit left wall");
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

//createIceBears();

function createIceBears() {
    var iceBearSpawnpointsX = [ 1100,  1900,  5900, 10000, 14000, 16700, 20200, 22500, 24800];
    var iceBearSpawnpointsY = [  600,   600,   600,   200,   600,   600,   600,   600,   600]
    var newiceBear;
    //Create the IceBears for the level w/ spawn points
    for (var i = 0; i < iceBearSpawnpointsX.length; i++) {
        newiceBear = Object.create(iceBearProto);
        newiceBear.spawnPointX = iceBearSpawnpointsX[i];
        newiceBear.spawnPointY = iceBearSpawnpointsY[i];
        newiceBear.x = newiceBear.spawnPointX;
        newiceBear.y = newiceBear.spawnPointY;
        iceBear.push(newiceBear);
    }
}

//Assign iceBear images L/R
var iceBearImg = [new Image, new Image];
//iceBearImg.addEventListener("load", loadHandler, false);
iceBearImg[0].src = "./Assets/Enemy/IcePlanet/IceBearSpriteR.png";
iceBearImg[1].src = "./Assets/Enemy/IcePlanet/IceBearSpriteL.png";
//iceBear.img = iceBearImg;

//function loadHandler() {
    updateBearAnimation();
//}

function updateBearAnimation()
{
    setTimeout(updateBearAnimation, 100);
    for (var i = 0; i < iceBear.length; i ++)
        iceBear[i].updateAnimation();
}

function iceBearCollision() {
    //console.log("Player hit: " + player.hit);
    //console.log("Player health: " + player.health);
    for (var j = 0; j < iceBear.length; j++) {
        if ((player.x > iceBear[j].x - SIZE) && (player.x < iceBear[j].x + iceBear[j].size)) {
            //It's within x-range, check y-range
            //console.log("player/iceBear in x-range..");
            if ((player.y > iceBear[j].y - iceBear[j].size) && (player.y < iceBear[j].y + iceBear[j].size)) {
                //It's in both ranges so iceBear and player have collided
                //console.log("player/iceBear in y-range..");
                if (player.hit === false)
                    reconcileDamage();
            }
        }
        for (var i = 0; i < bulletArray.length; i++) {
            if ((bulletArray[i].x + 10 > iceBear[j].x) && (bulletArray[i].x < iceBear[j].x + iceBear[j].size + 10)) {
                if ((bulletArray[i].y + 10 > iceBear[j].y) && (bulletArray[i].y < iceBear[j].y + iceBear[j].size)) {
                    bulletArray.splice(i, 1);
                    iceBear[j].HP--
                    enemyIsDamaged.play();
                }
                if (iceBear[j].HP <= 0)
                   { 
                     iceBear.splice(j, 1);
                     score += 10;
                   }
            }
            //console.log("iceBear " + j + " HP: " + iceBear[j].HP);
        }
    }
}

function endGame()
    {
       // clearInterval(idInt);
       // clearInterval(idInt2);
       // clearInterval(idInt3);
       // window.alert("Game over!")
    }