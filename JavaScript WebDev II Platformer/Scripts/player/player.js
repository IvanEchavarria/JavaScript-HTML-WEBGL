//Player
var playerAnimationIntervalID;
var leftPressed = false;
var rightPressed = false;
var stageArrival = true;
var stageDeparture = false;
var stageArrivalDrawPermit = false;
var stageArrivalTimer = 0;
var bulletCount = 0;
var bulletTimer = 0;
var flashCount = 0;
var playerAlive = true;
var jumpLimit = 1;
var score = 0;


// World variables
var WORLDSPEED = 8;
var gravity =  1.7;
var impulse = 2.8;
var clockTimer = 0;


//Getting the user input in an array for multiple input.
var inputArray = [];
// For keeping track of player bullets
var bulletArray = [];

var isPressed=false; // any key is Pressed
var end=false; 
	
//Array for all player images.....
var images = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),
	          new Image(), new Image(), new Image(), new Image(), new Image()];
images[0].src = "./Assets/MainCharacter/MainCharacterIdleR.png";
images[1].src = "./Assets/MainCharacter/MainCharacterIdleL.png";
images[2].src = "./Assets/MainCharacter/MainCharacterRunL.png";
images[3].src = "./Assets/MainCharacter/MainCharacterRunR.png";
images[4].src = "./Assets/MainCharacter/mainCharacterJumpRight.png";
images[5].src = "./Assets/MainCharacter/mainCharacterJumpLeft.png";
images[6].src = "./Assets/MainCharacter/MainCharacterShootingL.png";
images[7].src = "./Assets/MainCharacter/MainCharacterShootingR.png";
images[8].src = "./Assets/MainCharacter/NoMoveShootingL.png";
images[9].src = "./Assets/MainCharacter/NoMoveShootingR.png";
images[10].src = "./Assets/MainCharacter/MainCharacterDamageR.png";
images[11].src = "./Assets/MainCharacter/MainCharacterDamageL.png";
images[12].src = "./Assets/MainCharacter/DeathSprite.png";
images[13].src = "./Assets/MainCharacter/TeleportSpriteIn.png";
images[14].src = "./Assets/MainCharacter/TeleportSpriteOut.png";
images[15].src = "./Assets/MainCharacter/mainCharacterJumpShootL.png";
images[16].src = "./Assets/MainCharacter/mainCharacterJumpShootR.png";

var playerHealthFrame = new Image();
playerHealthFrame.src = "./Assets/UI/MaxHealthFrame.png";
var playerBulletR = new Image();
playerBulletR.src = "./Assets/MainCharacter/bulletSprite.png";
var playerBulletL = new Image();
playerBulletL.src = "./Assets/MainCharacter/bulletSpriteL.png";




//creating Player object.....
var player = {img: images[13], x:100, y:600, dir:1, idle:true, width:100, height:100 , speed: WORLDSPEED, sX :0, sY:0 , isJumping: false, onGround: false, damage: 0, health: 5, hit: false};

	
var frameIndex = 0; 	// Index of the player sprite to display via drawImage.
var currentFrame = 0; 	// Counter for the player frames.
var maxFrames = 3; 		// The number of frames in a single player sprite is drawn.

window.addEventListener("keydown", function(e)
{
	inputArray[e.keyCode] = true;  
});
window.addEventListener("keyup", function(e)
{
	isPressed = false;
	if(e.keyCode === 32)
	{
	   jumpLimit = 1;
	}
	inputArray[e.keyCode] = false;
	
});

function arriveToStage()
{
	if(stageArrivalTimer === 3)
	{
		//A set interval to animate the player images...
		stageArrivalDrawPermit = true;
		playerTeleportSound.play();
		frameIndex = 0;
		player.img = images[13];
		playerAnimationIntervalID = setInterval(playerAnimationUpdate, 70);
		
		
	}

	stageArrivalTimer++;
	clockTimer++;
	bulletTimer += 1;
	var timerId = setTimeout(arriveToStage, 500);
}



var n=0;

function playerAnimationUpdate()
{	
	animate();

	moveBullets();
}

//Map scroll function, moves every tile when the player has reached the desired range
function scrollMap()
{
	//Scroll the map if player.x>= 300 & isPressed == True
	if (playerAlive && isPressed && player.x >= 300 && !transitionToFinalStage)
	{
		for (var row = 0; row < map.length; row++)
		{
			for (var col = 0; col < map[0].length; col++)
			{
				map[row][col].x -= WORLDSPEED;
				
				//if the end of the map reaches on the screen change the end varialbe to true and stop scrolling.....
				if (map[map.length - 1][map[0].length - 1].x == 1304)
				{
					end = true;
					break;
				}
			}
		}
		
	}
}


//Collision between map element & player
function collision()
{
	for (var r =0; r < map.length ; r++)
	{
		for (var c =0 ; c < map[0].length ; c ++)
		{
			if(map[r][c].aRock)
			{
				//Get the distance from the center of the player to the center of a rock

			    var vectorX = (player.x + SIZE - 65) - (map[r][c].x + (SIZE/2));
				var vectorY = (player.y + (player.height/2)) - (map[r][c].y + (SIZE/2));

												
				var boxWidth = ((player.width/2) - 10) + SIZE/2;

				if(Math.abs(vectorX) < boxWidth && Math.abs(vectorY) < SIZE)
				{
					var cX = boxWidth - Math.abs(vectorX);
					var cY = SIZE- Math.abs(vectorY);

					//Head Collision
					if( !map[r][c].smallPlatform )
					{
						if (vectorY > 0 && ((((player.x + SIZE - 30) >= (map[r][c].x )) || ( (player.x + 30) >= (map[r][c].x ) )) && ((player.x + 30) <= (map[r][c].x + SIZE))))
							{	
								if(player.y <= (map[r][c].y + SIZE/2) && (player.y >= map[r][c].y) )
								{	
									player.sY *= -1;
								
								}							
							}
					}
					if( cX >= cY)
					{
						//We are on ground
					  if ( vectorY <= 0 && ((((player.x + SIZE - 30) >= (map[r][c].x )) || ( (player.x + 30) >= (map[r][c].x ) )) && ((player.x + 30) <= (map[r][c].x + SIZE))))
						{
						
							player.onGround = true;
							if(player.onGround && player.isJumping)
							{
								playerOnGroundSound.play();
							}							
							player.sY = 0;
							player.isJumping = false;
						    player.y = map[r][c].y - player.height;

						}

					}else
					{  // Left side collision
						if(vectorX >= 0  && vectorX <= 70 )
						{
							
							player.img = images[1];
							player.x = map[r][c].x + SIZE - 20;
							
						}
						//Right side collision
						else if(((player.x + SIZE - 20) >= map[r][c].x) && (player.x + SIZE - 20) <= (map[r][c].x + SIZE/2))
						{
							
							player.img = images[0];
							player.x = map[r][c].x - (player.width - 20);
							
						}
					}	
				}

				
				for (i = 0; i < bulletArray.length; i++)
					{
						if(map[r][c].x > 0)
						{
							if ((bulletArray[i].x >= map[r][c].x  &&  bulletArray[i].x <= map[r][c].x + SIZE )) 
							{					
								if ((bulletArray[i].y <= map[r][c].y + SIZE ) && (bulletArray[i].y >= map[r][c].y)) 
								{
									bulletArray.splice(i,1);
									
								}
							}
						}
					}
				

			}
			if(map[r][c].lava)
			{
				var vectorX = (player.x + (player.width/2) - 10) - (map[r][c].x + (SIZE/2));
				var vectorY = (player.y + (player.height/2)) - (map[r][c].y + (SIZE));
				
				var boxWidth = ((player.width/2) - 10) + SIZE/2;


				if(Math.abs(vectorX) < boxWidth && Math.abs(vectorY) < SIZE)
				{
					var cX = boxWidth - Math.abs(vectorX);
					var cY = SIZE- Math.abs(vectorY);

					if( cX >= cY)
					{
						if (vectorY < 0)
						{
							//frameIndex = 0; 	
				            //currentFrame = 0;
							player.img = images[12];
							playerAlive = false;
							player.speed = 0;
							player.sY = 0;
							gravity = 0;
							divHealthP.style.width = 0 + 'px';
           					divHealthP.innerHTML = 0 * 1 + '%';							
							deathSound.play();
							setTimeout(gameEnd, 1000);
								
															
						}
					}					
				}
			}
		}
	}
}



// Create temporary bullet
function createBullet()
{
	if(player.dir === 1)
	{
		var tempBullet = {img: playerBulletR, x: (player.x + SIZE - 8), y:player.y + 40, bulletLife: 700 , speedDir: 0 , speed: 40};  
	
	}
	else if(player.dir === -1)
		{
			var tempBullet = {img: playerBulletL, x: (player.x - 8), y:player.y + 40, bulletLife: 700 , speedDir: 0, speed: 40};  
		
		}
	 
	bulletArray.push(tempBullet);
}
function moveBullets()
{
	var i = 0; 

	while(bulletArray[i] != undefined)
	{
		if (bulletArray[i].bulletLife <= 0 || bulletArray[i].x < 0 )
		{
			bulletArray.splice(i,1);
			break;
			
		}

		if(player.dir === 1 && bulletArray[i].speedDir === 0)	
		{
			bulletArray[i].speedDir = 1;
		}
		if (player.dir === -1 && bulletArray[i].speedDir === 0)
		{	
			bulletArray[i].speedDir = -1;				
		}

		if(bulletArray[i].speedDir === 1)	
		{
			bulletArray[i].x += bulletArray[i].speed;
			bulletArray[i].bulletLife -= bulletArray[i].speed;
	
		}
		if (bulletArray[i].speedDir === -1 )
		{		
			bulletArray[i].x -= bulletArray[i].speed;
			bulletArray[i].bulletLife -= bulletArray[i].speed;
			
		}

	i++;
	}  
}
//To set the right image from Array images for the player with the right key
function handleInput()
{
	if(!stageArrival && playerAlive && !stageDeparture)
	{
		
			// Space, is the player jumping?
		if(inputArray[32] && jumpLimit === 1)
		{
			jumpLimit = 0;
			if(!player.isJumping && player.onGround)
			{
				frameIndex = 0; 	
				currentFrame = 0;
				player.isJumping = true;
				player.onGround = false;
				player.sY = -player.speed * impulse;
				jumpSound.play();

				if(player.dir === 1)
				{
					player.img = images[4];

				}else
				{
					player.img = images[5];
				}
			
			}
		}

		// Left Arrow or key A
		if(inputArray[65] || inputArray[37])
		{
			
			if(player.isJumping)
			{
				player.img = images[5];

			}else
			{
				player.img = images[2];
			}
			
			player.dir = -1;
			player.x -= player.speed;
		}

		//Right Arrow or key D
		if(inputArray[68] || inputArray[39])
		{
			
			if(player.isJumping)
			{
				player.img = images[4];
				
			}else
			{
				player.img = images[3];
			}		
			player.dir = 1;
			isPressed = true;
			if (player.x <= 300 || (end == true && player.x < 1300))
			{ 
				player.x += player.speed; 
			}
		}

		//Shooting X & K
		if(inputArray[88] || inputArray[75])
		{
			//Shooting and moving to the left
				if((inputArray[65] || inputArray[37]) && player.onGround)
				{
					player.img = images[6];
				}
				//Shooting and moving to the right
				else if((inputArray[68] || inputArray[39]) && player.onGround)
				{
					player.img = images[7];
				}
				// Shoothing and jump left
				else if(inputArray[32] && (player.dir === -1) && !player.onGround )
				{
					player.img = images[15];
				}
				// Shooting and jump right
				else if(inputArray[32] && (player.dir === 1) && !player.onGround)
				{
					player.img = images[16];
				}
				else if(player.dir === 1 && player.onGround)
				{
					player.img = images[9];

				}else if(player.dir === -1 && player.onGround)
				{
					player.img = images[8];
				}

				if( bulletTimer >= 1)
				{
					bulletTimer = 0;
					shootSound.play();
					createBullet();	

				}

		}
		//There is no input, then idle, or if there is conflicting input idle
		if((!(inputArray[65] || inputArray[37]) && !(inputArray[68] || inputArray[39]) && !(inputArray[88] || inputArray[75]) && player.onGround) 
			|| ((inputArray[65] || inputArray[37]) && (inputArray[68] || inputArray[39]) && player.onGround))
		{

			if(player.dir === 1)
			{
				player.img = images[0];

			}else
			{
				player.img = images[1];
			}

		}

		player.sY += gravity;
		player.y += player.sY;
		player.onGround = false;

		if(player.x >= canvas.width - player.width)
		{
			player.x = canvas.width - player.width;
		}
		else if ( player.x <= 0)
		{
			player.x = 0;
		}
		
		if(player.damage!=0 || player.hit === true)
		{
			if(flashCount === 0)
				{  
					flashCount++;
					damageFlash(flashCount);
				}
		}
	}
}

function damageFlash(flashCount)
{
	
	if(flashCount === 1 )
		{			
			stageArrivalDrawPermit = false;
			flashCount++;
			setTimeout(function(){ damageFlash(flashCount)} , 200); 
		}
		else if(flashCount > 1)
			{
				stageArrivalDrawPermit = true;
				flashCount++;
			}
}

//Animating the player images....
function animate()
{
	if (currentFrame === maxFrames)
	{
		frameIndex++;
		currentFrame = 0;
		if (frameIndex == 4)
		{
			if(stageArrival)
				{
					player.img = images[0];
					stageArrival = false;					
				}
			frameIndex = 0;
		}
	}
	currentFrame++;
}