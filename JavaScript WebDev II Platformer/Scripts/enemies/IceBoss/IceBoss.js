//Fire Boss
var textDraw=false;
var bossHealthBarDraw=false;
var bossIceArmAttackAnimation = false;
var bossIceSecondAttack = false;
var bossIceOut = false;
var bossIceIn = false;
var iceBossAlive = true;
var countATK=0;
var audioIceBoss=document.createElement("audio");
audioIceBoss.setAttribute("src","./Assets/Sound/IceBoss_theme.mp3");

var audioIntoBoss=document.createElement("audio");
audioIntoBoss.setAttribute("src","./Assets/Sound/BossIntro.mp3");

var audioPlayerDeath = document.createElement("audio");
audioPlayerDeath.setAttribute("src","./Assets/Sound/Effects/HeroDeath.wav");

//Fire boss array of images
var imagesC = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(),new Image(), new Image(),new Image(), new Image()];
imagesC[0].src = "./Assets/Enemy/IcePlanet/IceBossSpriteL.png";
imagesC[1].src = "./Assets/Enemy/IcePlanet/IceBossSpriteR.png";
imagesC[2].src = "./Assets/Enemy/IcePlanet/IceBossATKL.png";
imagesC[3].src = "./Assets/Enemy/IcePlanet/IceBossATKR.png";
imagesC[4].src = "./Assets/Enemy/IcePlanet/IceBossATK2PreparationSprite.png";
imagesC[5].src = "./Assets/Enemy/IcePlanet/IceBossATK2PreparationSpriteR.png";
imagesC[6].src = "./Assets/Enemy/IcePlanet/IceBossATK2OUTSpriteL.png";
imagesC[7].src = "./Assets/Enemy/IcePlanet/IceBossATK2OUTSpriteR.png";
imagesC[8].src = "./Assets/Enemy/IcePlanet/IceBossATK2L.png";
imagesC[9].src = "./Assets/Enemy/IcePlanet/IceBossATK2R.png";


var bossIceATK=[new Image(), new Image()];
bossIceATK[0].src = "./Assets/Enemy/IcePlanet/IceBossATK2L.png";
bossIceATK[1].src = "./Assets/Enemy/IcePlanet/IceBossATK2R.png";


healthBarFrameImg.src = "./Assets/UI/HealthFrame.png";
healthBarFrameImg.width = 500;
healthBarFrameImg.height = 40;



var iceBoss={x:28900,y:450,dir:1,img: imagesC[0],width:200,height:150,onground:true,health:20};
var iceBossATK=[];


var iceBossFrameIndex = 0; 	// Index of the Boss sprite to display via drawImage.
var iceBossCurrentFrame = 0; 	// Counter for the Boss frames.
var iceBossMaxFrames = 3; 		// The number of frames in a single boss sprite is drawn.

var idInticeB = setInterval(updateiceB, 70);

function updateiceB()
{	
	animateiceBoss();
	moveIceBossATK();
}

function moveiceBoss()
{
	if(isPressed && player.x >= 300 && end==false)
	{	
		if(iceBoss.dir === 1)
		{
			iceBoss.x-=8;
			if(iceBoss.x<0)
			{
				iceBoss.dir = -1;
			}
		}
		if(iceBoss.dir === -1)
		{
			iceBoss.x+=8;

			if(iceBoss.x>1300)
			{
				iceBoss.dir = 1;
			}
		}
		if(iceBoss.x==1924)
		{
			iceThemeSong.pause();
			if(playSounds)
			{
				audioIntoBoss.play();
			}
			
			textDraw=true;
		}
		if(iceBoss.x==1580)
		{
			if(playSounds)
			{
				audioIntoBoss.pause();
				audioIceBoss.play();
				audioIceBoss.loop = true;
			}
			textDraw=false;		
		}
	}	
	if(((isPressed==false&&end==true)||(isPressed==true&&end==true)) && iceBossAlive)
	{
		//Distance from the center of the player to the center of the boss on X
		var vectorX =  (player.x + SIZE/2) - (iceBoss.x + iceBoss.width/2);
		
		if(vectorX < 0)
		{
			
			if(vectorX >-144 && vectorX <0 )
				{	
					
					bossIceArmAttackAnimation = true;
					bossIceSecondAttack=false;
					bossIceOut=false;
					bossIceIn=false;
					iceBoss.img=imagesC[2];
				}
			else if(vectorX >-344 && vectorX < -244 )
				{
					bossIceOut=true;
					bossIceIn=false;
					bossIceArmAttackAnimation = false;
					bossIceSecondAttack=false;
					iceBoss.img=imagesC[6];
				
				}
			else if(vectorX >-444 && vectorX < -344 )
				{
					bossIceOut=false;
					bossIceIn=false;
					bossIceArmAttackAnimation = false;
					bossIceSecondAttack=true;
					iceBoss.img=imagesC[8];	
					countATK++;
					if(countATK==1)createIceBossATK();
				}
			else if(vectorX > -544 && vectorX < -444)
				{
					bossIceArmAttackAnimation = false;
					bossIceSecondAttack=false;
					bossIceOut=false;
					bossIceIn=true;
					iceBoss.img=imagesC[4];
				}
			else if((vectorX < -144 && vectorX > -244)||(vectorX < -544))
				{
					bossIceArmAttackAnimation = false;
					bossIceSecondAttack=false;
					bossIceOut=false;
					bossIceIn=false;
					countATK=0;
				}

		}
		else if( vectorX > 0)
		{
			if(vectorX <144 && vectorX > 0 )
				{	
					
					bossIceArmAttackAnimation = true;
					bossIceSecondAttack=false;
					bossIceOut=false;
					bossIceIn=false;
					iceBoss.img=imagesC[3];
				}
			else if(vectorX <344 && vectorX > 244 )
				{
					bossIceOut=true;
					bossIceIn=false;
					bossIceArmAttackAnimation = false;
					bossIceSecondAttack=false;
					iceBoss.img=imagesC[7];
				
				}
			else if(vectorX <444 && vectorX > 344 )
				{
					bossIceOut=false;
					bossIceIn=false;
					bossIceArmAttackAnimation = false;
					bossIceSecondAttack=true;
					iceBoss.img=imagesC[9];		
					countATK++;
					if(countATK==1)createIceBossATK();
				}
			else if(vectorX < 544 && vectorX > 444)
				{
					bossIceArmAttackAnimation = false;
					bossIceSecondAttack=false;
					bossIceOut=false;
					bossIceIn=true;
					iceBoss.img=imagesC[5];
				}
			else if((vectorX > 144 && vectorX < 244)||(vectorX > 544))
				{
					bossIceArmAttackAnimation = false;
					bossIceSecondAttack=false;
					bossIceOut=false;
					bossIceIn=false;
					countATK=0;
					
				}
		}
			if(iceBossAlive)
		{
			bossHealthBarDraw=true;
		}		
			
		
		if(iceBoss.dir==1)
		{
			if(!bossIceArmAttackAnimation && !bossIceSecondAttack && !bossIceIn && !bossIceOut)
			{
			  	iceBoss.img=imagesC[0];
			}

			iceBoss.x-=8;
			
			if(iceBoss.x<0)
			{
				iceBoss.dir=-1;
			}
		}
		if(iceBoss.dir==-1)
		{
			if(!bossIceArmAttackAnimation && !bossIceSecondAttack && !bossIceIn && !bossIceOut)
			{
				iceBoss.img=imagesC[1];
			}

			iceBoss.x+=8;
				//console.log(iceBoss.x);
			if(iceBoss.x>1204)
			{
				iceBoss.dir=1;
			}
		}
	}
}


function createIceBossATK()
{
	
	if(iceBoss.img === imagesC[8] && iceBossAlive)
	{
		var tempBullet = {x: (iceBoss.x ), y:iceBoss.y ,img:bossIceATK[0], bulletLife: 700 , speedDir: 0 , speed: 60};  
	
	}
	else if(iceBoss.img === imagesC[9] && iceBossAlive)
		{
			var tempBullet = {x: (iceBoss.x), y:iceBoss.y  ,img:bossIceATK[1], bulletLife: 700 , speedDir: 0, speed: 60};  
		
		}
	 
	iceBossATK.push(tempBullet);
}

function moveIceBossATK()
{
	var i = 0; 

	while(iceBossATK[i] != undefined && iceBossAlive)
	{
		if (iceBossATK[i].bulletLife <= 0 || iceBossATK[i].x < 0 )
		{
			iceBossATK.splice(i,1);
			break;
		}

		if(iceBoss.img === imagesC[9] && iceBossATK[i].speedDir === 0)	
		{
			iceBossATK[i].speedDir = 1;
		}
		if (iceBoss.img === imagesC[8] && iceBossATK[i].speedDir === 0)
		{	
			iceBossATK[i].speedDir = -1;				
		}

		if(iceBossATK[i].speedDir === 1)	
		{
			iceBossATK[i].x +=iceBossATK[i].speed;
			iceBossATK[i].bulletLife -= iceBossATK[i].speed;
	
		}
		if (iceBossATK[i].speedDir === -1 )
		{		
			iceBossATK[i].x -= iceBossATK[i].speed;
			iceBossATK[i].bulletLife -= iceBossATK[i].speed;
			
		}

	i++;
	
	}  
}

var countP=0; //Counts how many time collision happens between player and Fire Boss
var countB=0; //Counts how many time collision happens between bullet and Fire Boss
var countR=0;

function iceBossCollision()
{
	if ((player.x + player.width > iceBoss.x ) && (player.x < iceBoss.x + iceBoss.width+10))
	{
        if ((player.y + player.height > iceBoss.y ) && (player.y < iceBoss.y + iceBoss.height))
		{

			countP++;
			if(countP==1){ 
				player.damage++;
				player.health--;
				drain();
				setTimeout(playerRecovered, 2000);}
			//console.log("Count"+count);
        }
    }else
	{
		countP=0;
		player.damage=0;
	}
	if(iceBoss.health<=0 && iceBossAlive)
	{
		iceBossAlive = false;
		score += 100;
		iceBoss.img = images[12];
		stageDeparture = true;
		flashCount = 0;
		audioIceBoss.pause();
		bossVictory.play();
		bossHealthBarDraw = false;
		end = true;
		stageSelection = 2;
		setTimeout(teleportOut, 5000);
       
		audioBoss.pause();
        bossVictory.play();
		regenHealth();
       // setTimeout(toIceLevel, 1000);
	}
	for (i = 0; i < bulletArray.length; i++)
	{
	if ((bulletArray[i].x + 10 > iceBoss.x ) && (bulletArray[i].x < iceBoss.x + iceBoss.width+10)) {
       
        if ((bulletArray[i].y + 10 > iceBoss.y ) && (bulletArray[i].y < iceBoss.y + iceBoss.height)) {
			bulletArray.splice(i,1);
			enemyIsDamaged.play();
			countB++;
			if(countB==1){iceBoss.health--; healthBarImage.width-=25;}
        }
    }else{
		countB=0;
	}
	}
	for (i = 0; i < iceBossATK.length; i++)
	{
	if ((iceBossATK[i].x + 200 > player.x ) && (iceBossATK[i].x+45 <  player.x +  player.width+10)) {
       
        if ((iceBossATK[i].y + SIZE +50 >  player.y ) && (iceBossATK[i].y <  player.y +  player.height)) {
			iceBossATK.splice(i,1);
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
			if(map[r][c].smallPlatform&&end==true)
			{
				var mapMid=(map[r][c].x + (SIZE/2));
				var bossMid=(iceBoss.x + (iceBoss.width/2));
				var distance=Math.abs(bossMid-mapMid);											
				if( (distance>=0 && distance<=70)) 
				{						
					if(r==1){iceBoss.y=150;	}
					if(r==2){iceBoss.y=250;	}
					if(r==3){iceBoss.y=350;	}
					if(r==4){iceBoss.y=450;	}
				}
			}
		}
	}
}


function animateiceBoss()
{
	if (iceBossCurrentFrame === iceBossMaxFrames)
	{
		iceBossFrameIndex++;
		iceBossCurrentFrame = 0;
		if (iceBossFrameIndex == 4)
			iceBossFrameIndex = 0;
	}
	iceBossCurrentFrame++;
}

