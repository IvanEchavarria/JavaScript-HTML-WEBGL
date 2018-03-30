//Fire Boss
var textDraw=false;
var bossHealthBarDraw=false;
var bossArmAttackAnimation = false;
var fireBossAlive = true;
var fadeTransition = 0;
var audioBoss=document.createElement("audio");
audioBoss.setAttribute("src","./Assets/Sound/Fire/FireBoss.mp3");

var audioIntoBoss=document.createElement("audio");
audioIntoBoss.setAttribute("src","./Assets/Sound/BossIntro.mp3");

var audioPlayerDeath = document.createElement("audio");
audioPlayerDeath.setAttribute("src","./Assets/Sound/Effects/HeroDeath.wav");

//Fire boss array of images
var imagesB = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
imagesB[0].src = "./Assets/Enemy/FirePlanet/FireBossSpriteSheetL.png";
imagesB[1].src = "./Assets/Enemy/FirePlanet/FireBossSpriteSheetR.png";
imagesB[2].src = "./Assets/Enemy/FirePlanet/FireBossAttackSpriteL.png";
imagesB[3].src = "./Assets/Enemy/FirePlanet/FireBossAttackSpriteR.png";
imagesB[4].src = "./Assets/Enemy/FirePlanet/FireBossNoArmSpriteL.png";
imagesB[5].src = "./Assets/Enemy/FirePlanet/FireBossNoArmSpriteR.png";

var armImages=[new Image(), new Image()];
armImages[0].src = "./Assets/Enemy/FirePlanet/FireBossArmL.png";
armImages[1].src = "./Assets/Enemy/FirePlanet/FireBossArmR.png";

var bossArmImgL = new Image();
bossArmImgL.src = "./Assets/Enemy/FirePlanet/FireBossArmL.png";
var bossArmImgR = new Image();
bossArmImgR.src = "./Assets/Enemy/FirePlanet/FireBossArmR.png";



var healthBarImage=new Image();
var healthBarFrameImg = new Image();
healthBarImage.src="./Assets/UI/HealthFire.png";
healthBarFrameImg.src = "./Assets/UI/HealthFrame.png";
healthBarImage.width=500;
healthBarImage.height=40;
healthBarFrameImg.width = 500;
healthBarFrameImg.height = 40;



var fireBoss={x:8400,y:450,dir:1,img: imagesB[0],width:100,height:250,onground:true,health:10};
var fireBossArm=[];

var fireBossFrameIndex = 0; 	// Index of the Boss sprite to display via drawImage.
var fireBossCurrentFrame = 0; 	// Counter for the Boss frames.
var fireBossMaxFrames = 3; 		// The number of frames in a single boss sprite is drawn.

var idIntB = setInterval(updateB, 70);

function updateB()
{	
	animateFireBoss();
	moveFireBossArm();
}

function moveBoss()
{
	if(isPressed && player.x >= 300&&end==false)
	{	
		if(fireBoss.dir === 1)
		{
			fireBoss.x-=8;
		  
			if(fireBoss.x<100)
			{
				fireBoss.dir = -1;
			}
		}
		if(fireBoss.dir === -1)
		{
			fireBoss.x+=8;

			if(fireBoss.x>1300)
			{
				fireBoss.dir = 1;
			}
		}
		if(fireBoss.x==1904)
		{
			themeSong.pause();
			if(playSounds)
			{
				audioIntoBoss.play();
			}
			
			textDraw=true;
		}
		if(fireBoss.x==1576)
		{
			if(playSounds)
			{
				audioIntoBoss.pause();
				audioBoss.play();
				audioBoss.loop = true;
			}
			textDraw=false;		
		}
	}	
	if((isPressed==false&&end==true)||(isPressed==true&&end==true))
	{
		//Distance from the center of the player to the center of the boss on X
		var vectorX =  (player.x + SIZE/2) - (fireBoss.x + fireBoss.width/2);
		
		if(vectorX < 0)
		{
			
			if(vectorX > -144 && vectorX < 0 )
				{						
					bossArmAttackAnimation = true;	
					fireBoss.img=imagesB[2];
				}
			 if(vectorX > -544 && vectorX < -444)
				{
					bossArmAttackAnimation = false;
					bossArmAttack=true;
					countarm++;
					fireBoss.img=imagesB[4];
					if(countarm==1)
					createFireBossArm();
					
			
				}
				else if((vectorX < -144 && vectorX > -444)||(vectorX < -544))
				{
					bossArmAttackAnimation = false;
					bossArmAttack=false;
					 countarm=0;
					
					
				}

		}
		else if( vectorX > 0)
		{
			if(vectorX <144 && vectorX > 0 )
				{	
					
					bossArmAttackAnimation = true;	
					fireBoss.img=imagesB[3];
				}
			else if(vectorX < 544 && vectorX > 444)
				{
					bossArmAttackAnimation = false;
					bossArmAttack=true;
					
					fireBoss.img=imagesB[5];
					
				countarm++;
				if(countarm==1)createFireBossArm();
				}				
				
		}
		if(fireBossAlive)
		{
			bossHealthBarDraw=true;
		}			
		
		if(fireBoss.dir==1 && fireBossAlive)
		{
			if(!bossArmAttackAnimation && !bossArmAttack)
			{
			  	fireBoss.img=imagesB[0];
			}

			fireBoss.x-=8;

			if(fireBoss.x<0)
			{
				fireBoss.dir=-1;
			}
		}
		if(fireBoss.dir==-1 && fireBossAlive)
		{
			if(!bossArmAttackAnimation  && !bossArmAttack)
			{
				fireBoss.img=imagesB[1];
			}

			fireBoss.x+=8;

			if(fireBoss.x>1300)
			{
				fireBoss.dir=1;
			}
		}
	}
}

function createFireBossArm()
{
	
	if(fireBoss.img === imagesB[4])
	{
		var tempBullet = {x: (fireBoss.x +SIZE), y:fireBoss.y +150 ,img:armImages[0], bulletLife: 700 , speedDir: 0 , speed: 60};  
	
	}
	else if(fireBoss.img === imagesB[5])
		{
			var tempBullet = {x: (fireBoss.x +SIZE), y:fireBoss.y +150  ,img:armImages[1], bulletLife: 700 , speedDir: 0, speed: 60};  
		
		}
	 
	fireBossArm.push(tempBullet);
}

function moveFireBossArm()
{
	var i = 0; 

	while(fireBossArm[i] != undefined)
	{
		if (fireBossArm[i].bulletLife <= 0 || fireBossArm[i].x < 0 )
		{
			fireBossArm.splice(i,1);
			break;
		}

		if(fireBoss.img === imagesB[5] && fireBossArm[i].speedDir === 0)	
		{
			fireBossArm[i].speedDir = 1;
		}
		if (fireBoss.img === imagesB[4] && fireBossArm[i].speedDir === 0)
		{	
			fireBossArm[i].speedDir = -1;				
		}

		if(fireBossArm[i].speedDir === 1)	
		{
			fireBossArm[i].x +=fireBossArm[i].speed;
			fireBossArm[i].bulletLife -= fireBossArm[i].speed;
	
		}
		if (fireBossArm[i].speedDir === -1 )
		{		
			fireBossArm[i].x -= fireBossArm[i].speed;
			fireBossArm[i].bulletLife -= fireBossArm[i].speed;
			
		}

	i++;
	
	}  
}

var countP=0; //Counts how many time collision happens between player and Fire Boss
var countB=0; //Counts how many time collision happens between bullet and Fire Boss
var countR=0;


function fireBossCollision()
{
	if ((player.x + player.width > fireBoss.x ) && (player.x < fireBoss.x + fireBoss.width+10))
	{
        if ((player.y + player.height > fireBoss.y ) && (player.y < fireBoss.y + fireBoss.height))
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
	if(fireBoss.health<=0 && fireBossAlive)
	{
		score += 100;
		fireBoss.img = images[12];
		stageDeparture = true;
		flashCount = 0;
		fireBossAlive = false;
		audioBoss.pause();
		bossVictory.play();
		bossHealthBarDraw = false;
		end = false;
		stageSelection = 1;
		
		setTimeout(teleportOut, 5000);
		regenHealth();
		
	}
	/*if(player.health<=0)
	{
		//alert("GameOver");
	}*/
	for (i = 0; i < bulletArray.length; i++)
	{
	if ((bulletArray[i].x + 10 > fireBoss.x ) && (bulletArray[i].x < fireBoss.x + fireBoss.width+10)) {
       
        if ((bulletArray[i].y + 10 > fireBoss.y ) && (bulletArray[i].y < fireBoss.y + fireBoss.height)) {
			bulletArray.splice(i,1);
			enemyIsDamaged.play();
			countB++;
			if(countB==1){fireBoss.health--; healthBarImage.width-=50;}
        }
    }else{
		countB=0;
	}
	}
		
	for (i = 0; i < fireBossArm.length; i++)
	{
	if ((fireBossArm[i].x + SIZE > player.x ) && (fireBossArm[i].x <  player.x +  player.width+10)) {
       
        if ((fireBossArm[i].y + 60 >  player.y ) && (fireBossArm[i].y +40 <  player.y +  player.height)) {
			fireBossArm.splice(i,1);
			countR++;
			if(countR==1){ player.damage++;player.health--;drain();}
        }
    }else{
		countR=0;
		player.damage=0;
	}
	}
	for (var r =0; r < map.length ; r++)
	{
		for (var c =0 ; c < map[0].length ; c ++)
		{
			if(map[r][c].aRock&&end==true)
			{
				var mapMid=(map[r][c].x + (SIZE/2));
				var bossMid=(fireBoss.x + (fireBoss.width/2));
				var distance=Math.abs(bossMid-mapMid);
											
				if((fireBoss.x<=map[r][c].x+SIZE)&&(fireBoss.x+fireBoss.width>=map[r][c].x)&&(distance>=0 && distance<=100))
					
				{
								
					if(r==2){fireBoss.y=450;}
					if(r==1){fireBoss.y=350;}
					if(r==0){fireBoss.y=250;}
							
				}
				
			}
		}
	}
}


function animateFireBoss()
{
	if (fireBossCurrentFrame === fireBossMaxFrames)
	{
		fireBossFrameIndex++;
		fireBossCurrentFrame = 0;
		if (fireBossFrameIndex == 4)
			fireBossFrameIndex = 0;
	}
	fireBossCurrentFrame++;

}


