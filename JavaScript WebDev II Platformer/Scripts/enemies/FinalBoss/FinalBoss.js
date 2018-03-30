//Final Boss
//var textDraw=false;
//var bossHealthBarDraw=false;
//var bossArmAttackAnimation = false;
//var fireBossAlive = true;
//var fadeTransition = 0;

var finalBossAlive = true;

var BossLaser=document.createElement("audio");
BossLaser.setAttribute("src","./Assets/Sound/Boss_Laser.wav");

var countFinalBossBullet=0;
//Fire boss array of images
var imagesF = [new Image(), new Image(), new Image()];
imagesF[0].src = "./Assets/Enemy/SentientShip/SentientShipF.png";
imagesF[1].src = "./Assets/Enemy/SentientShip/SentientShipR.png";
imagesF[2].src = "./Assets/Enemy/SentientShip/SentientShipL.png";



//healthBarFrameImg.src = "./Assets/UI/HealthFrame.png";  
//healthBarFrameImg.width = 500;
//healthBarFrameImg.height = 40;

var finalBossBullet = [];
var finalBossBulletImg = new Image();
finalBossBulletImg.src = "./Assets/Enemy/SentientShip/verticalBullet.png";

var finalBoss={x:500,y:100,dir:1,img: imagesF[0],width:300,height:240,onground:true,health:10};

var finalBossBulletFrameIndex = 0; 	// Index of the Boss sprite to display via drawImage.
var finalBossBulletCurrentFrame = 0; 	// Counter for the Boss frames.
var finalBossBulletMaxFrames = 3; 		// The number of frames in a single boss sprite is drawn.

var idIntF = setInterval(updateF, 70);

function updateF()
{	
	animateFinalBossBullet();
	moveFinalBossBullet();
}

function moveFinalBoss()
{
	if(((isPressed==false&&end==true)||(isPressed==true&&end==true))&&finalBossAlive)
	{
		bossHealthBarDraw=true;
		//Distance from the center of the player to the center of the boss on X
		var vectorX =  (player.x + SIZE/2) - (finalBoss.x + finalBoss.width/2);
		
		if(vectorX < 0)
		{
			
			if(vectorX > -144 && vectorX < 0 )
				{						
					finalBoss.img=imagesF[0];
					countFinalBossBullet++;
					if(countFinalBossBullet==1)
					{ BossLaser.play();
					 createFinalBossBullet();
					}
				}
			 if( vectorX < -144)
				{
					finalBoss.img=imagesF[2];
					countFinalBossBullet=0;
			
				}
				
		}
		else if( vectorX > 0)
		{
			if(vectorX <144 && vectorX > 0 )
				{	
					
					
					finalBoss.img=imagesF[0];
					countFinalBossBullet++;
					if(countFinalBossBullet==1)
					{ BossLaser.play();
					 createFinalBossBullet();
					}
				}
			else if(vectorX > 144)
				{
					
					countFinalBossBullet=0;
					finalBoss.img=imagesF[1];
				}	
							
				
		}
					
		
		if(finalBoss.dir==1)
		{
			finalBoss.x-=8;
			
			if(finalBoss.x<0)
			{
				finalBoss.y=Math.floor(Math.random()*300+1);
				finalBoss.dir=-1;
			}
		}
		if(finalBoss.dir==-1)
		{
			finalBoss.x+=8;
			
			if(finalBoss.x>1200)
			{
				finalBoss.y=Math.floor(Math.random()*300+1);
				finalBoss.dir=1;
			}
		}
	}
}

function createFinalBossBullet()
{
	if(finalBossAlive)
	{
	
		var tempBullet = {x: (finalBoss.x +Math.floor(Math.random()*100+1)), y:finalBoss.y +150 ,img:finalBossBulletImg, bulletLife: 700 , speedDir: 0 , speed: 60};  
	}
		 
	finalBossBullet.push(tempBullet);
}

function moveFinalBossBullet()
{
	var i = 0; 

	while(finalBossBullet[i] != undefined &&finalBossAlive)
	{
		if (finalBossBullet[i].bulletLife <= 0 || finalBossBullet[i].x < 0 )
		{
			finalBossBullet.splice(i,1);
			break;
		}

		
		if(finalBossBullet[i].speedDir === 0)	
		{
			finalBossBullet[i].y +=finalBossBullet[i].speed;
			finalBossBullet[i].bulletLife -= finalBossBullet[i].speed;
	
		}
		

	i++;
	
	}  
}

var countP=0; //Counts how many time collision happens between player and Fire Boss
var countB=0; //Counts how many time collision happens between bullet and Fire Boss
var countR=0;


function finalBossCollision()
{
	if ((player.x + player.width > finalBoss.x ) && (player.x < finalBoss.x + finalBoss.width+10))
	{
        if ((player.y + player.height > finalBoss.y ) && (player.y < finalBoss.y + finalBoss.height))
		{

			countP++;
			if(countP==1){
				player.damage++;
				player.health--;
				drain();
			    setTimeout(playerRecovered, 2000);}
	
        }
    }else
	{
		countP=0;
		player.damage=0;
	}
	if(finalBoss.health<=0 )
	{
		finalBossAlive=false;
		finalBoss.img = images[12];
		score += 100;		
		finalThemeSong.pause();
		bossVictory.play();
		setTimeout(gameWin, 5000);
	}
	for (i = 0; i < bulletArray.length; i++)
	{
	if ((bulletArray[i].x + 10 > finalBoss.x ) && (bulletArray[i].x < finalBoss.x + finalBoss.width+10)) {
       
        if ((bulletArray[i].y + 10 > finalBoss.y ) && (bulletArray[i].y < finalBoss.y + finalBoss.height)) {
			bulletArray.splice(i,1);
			enemyIsDamaged.play();
			countB++;
			if(countB==1)
			{
				finalBoss.health--; 
				healthBarImage.width-=50;
				if(healthBarImage.width==250)regenHealth();
			}
        }
    }else{
		countB=0;
	}
	}
		
	for (i = 0; i < finalBossBullet.length; i++)
	{
	if ((finalBossBullet[i].x + 30 > player.x ) && (finalBossBullet[i].x <  player.x +  player.width+10)) {
       
        if ((finalBossBullet[i].y + 65 >  player.y ) && (finalBossBullet[i].y <  player.y +  player.height)) {
			finalBossBullet.splice(i,1);
			countR++;
			if(countR==1){ player.damage++;player.health--;drain();}
        }
    }else{
		countR=0;
		player.damage=0;
	}
	}
	
}


//Animating the Final Boss Bullet images....
function animateFinalBossBullet()
{
		if (finalBossBulletCurrentFrame === finalBossBulletMaxFrames)
	{
		finalBossBulletFrameIndex++;
		finalBossBulletCurrentFrame = 0;
		if (finalBossBulletFrameIndex == 4)
			finalBossBulletFrameIndex = 0;
	}
	finalBossBulletCurrentFrame++;
}


