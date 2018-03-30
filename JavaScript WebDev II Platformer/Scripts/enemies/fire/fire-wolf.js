//console.log("Executing FireWolf script...");
var fireWolf = [];
var fireWolfProto = {
    img: null,
    size: 100,
    dir: 0, //pointing left
    maxFrames: 3,
    currentFrame: 0,
    frameIndex: 0,
    scrollCount: 0,
    sourceX: 0,
    sourceY: 0,
    spawnPoint: 0,
    x: 0,
    y: 600,
    DAMAGE: 1,
    HP: 1,
    SPEED: 5,
    updateAnimation: function() {
       // console.log("current frame: " + this.currentFrame + "frame index: " + this.frameIndex + "sourceX: " + this.sourceX);
        if (this.dir == 0){
            this.img = fireWolfImg[0];
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
            this.img = fireWolfImg[1];
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
        //console.log("Player x: " + player.x + " fireWolf x: " + this.x + " Total Scroll: " + this.scrollCount + " Direction: " + this.dir);
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
                                    //console.log("fireWolf hit right wall");
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
                                    //console.log("fireWolf hit left wall");
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
                                    //console.log("fireWolf hit right wall");
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
                                   // console.log("fireWolf hit left wall");
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
                               // console.log("fireWolf hit right wall");
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
                               // console.log("fireWolf hit left wall");
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

createFireWolves();

function createFireWolves() {
    var fireWolfSpawnpoints = [1900, 2300];
    var newFireWolf;
    //Create the FireWolves for the level w/ spawn points
    for (var i = 0; i < fireWolfSpawnpoints.length; i++) {
        newFireWolf = Object.create(fireWolfProto);
        newFireWolf.spawnPoint = fireWolfSpawnpoints[i];
        newFireWolf.x = newFireWolf.spawnPoint;
        fireWolf.push(newFireWolf);
    } 
}

//Assign FireWolf images L/R
var fireWolfImg = [new Image, new Image];
//fireWolfImg.addEventListener("load", loadHandler, false);
fireWolfImg[0].src = "./Assets/Enemy/FirePlanet/FireWolfSpriteR.png";
fireWolfImg[1].src = "./Assets/Enemy/FirePlanet/FireWolfSpriteL.png";
//fireWolf.img = fireWolfImg;

//function loadHandler() {
    updateWolfAnimation();
//}

function updateWolfAnimation()
{
    setTimeout(updateWolfAnimation, 100);
    for (var i = 0; i < fireWolf.length; i ++)
        fireWolf[i].updateAnimation();
}

function fireWolfCollision() {
    //console.log("Player hit: " + player.hit);
    //console.log("Player health: " + player.health);
    for (var j = 0; j < fireWolf.length; j++) {
        if ((player.x > fireWolf[j].x - SIZE) && (player.x < fireWolf[j].x + fireWolf[j].size)) {
            //It's within x-range, check y-range
            //console.log("player/fireWolf in x-range..");
            if ((player.y > fireWolf[j].y - fireWolf[j].size) && (player.y < fireWolf[j].y + fireWolf[j].size)) {
                //It's in both ranges so fireWolf and player have collided
                //console.log("player/fireWolf in y-range..");
                if (player.hit === false)
                    reconcileDamage();
            }
        }
        for (var i = 0; i < bulletArray.length; i++) {
            if ((bulletArray[i].x + 10 > fireWolf[j].x) && (bulletArray[i].x < fireWolf[j].x + fireWolf[j].size + 10)) {
                if ((bulletArray[i].y + 10 > fireWolf[j].y) && (bulletArray[i].y < fireWolf[j].y + fireWolf[j].size)) {
                    bulletArray.splice(i, 1);
                    fireWolf[j].HP--
                    enemyIsDamaged.play();
                }
                if (fireWolf[j].HP <= 0)
                    {
                        fireWolf.splice(j, 1);
                        score += 10;
                    }
                    
            }
            //console.log("fireWolf " + j + " HP: " + fireWolf[j].HP);
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