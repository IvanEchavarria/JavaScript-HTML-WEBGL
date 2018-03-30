//Variable initialization
var stage = document.getElementById("stage");
canvas = document.getElementById("myCanvas");
canvas.width = 1400;
canvas.height = 900;
var surface = canvas.getContext("2d");

var backgroundY = 0;
var speed = 1;
var fadeOutDone = false;
var splashScreens = true;
var splash1 = true;
var splash2 = false;
var splashHolder = false;
var splashTransitionTime = 0.0;

//Generating Fire Level Arrays
generateMap();


//Sound control setting
var playSounds = true;

//Audio
var introMusic = new Audio();
var themeSong = new Audio();
var iceThemeSong = new Audio();   
var finalThemeSong = new Audio();                
var bossVictory = new Audio();
var enemyIsDamaged = new Audio();
var andre = new Audio();
var caleb = new Audio();

// Player's sound effects
var jumpSound = new Audio();
var shootSound = new Audio();
var deathSound = new Audio();
var playerDamagedSound = new Audio();
var playerOnGroundSound = new Audio();
var playerTeleportSound = new Audio();
var andre = new Audio();
var caleb = new Audio();

//Mouse variable initialization
var mouseX;
var mouseY;
var fadeId = 0;
var fadeId1 = 0;
var fadeId2 = 0;
var fadeId3 = 0;
var fadeId4 = 0;
var fadeId5 = 0;
var time = 0.0;

//Image objects
var bgImage = new Image();
var logoImage = new Image();
var studioLogo = new Image();
var engineLogo = new Image();
var playImage = new Image();
playImage.setAttribute("id", "play");
//console.log("Img: " + playImage);
var instructImage = new Image();
var settingsImage = new Image();
var creditsImage = new Image();
var cometImage = new Image();
var backBtn=new Image();
var instructBg=new Image();
var creditBg=new Image();
var soundBtn=new Image();
var settingBg=new Image();
var fireBossWarning = new Image();
var iceBossWarning = new Image();

//Frame variables
var frames = 30;
var timerId = 0;

//Comet image variables
var cometX = [0,0];
var cometY = [0,0];
var cometWidth = 105;
var cometHeight = 120;

var cometVisible = false;
var cometSize = cometWidth;
var cometRotate = 0;

//Logo animation variables
var logoIndex = 0; 	        
var currentLogoFrame = 0; 
var maxLogoFrames = 3; 

//Image source locations
bgImage.src = "./Assets/UI/Background.png";
logoImage.src ="./Assets/UI/CometRushLogoSprite.png";
studioLogo.src = "./Assets/UI/Splash1.png";
engineLogo.src = "./Assets/UI/Splash2.png";
playImage.src = "./Assets/UI/play.png";
instructImage.src = "./Assets/UI/instructions.png";
settingsImage.src = "./Assets/UI/settings.png";
creditsImage.src = "./Assets/UI/credits.png";
cometImage.src = "./Assets/UI/fireball.png";
backBtn.src="./Assets/UI/BackBtn.png";
instructBg.src="./Assets/UI/Controls.png";
creditBg.src="./Assets/UI/CreditBg.png";
soundBtn.src="./Assets/UI/soundBtn.png";
settingBg.src="./Assets/UI/settingBg.png";
fireBossWarning.src = "./Assets/UI/WarningRedSpriteSheet.png";
iceBossWarning.src = "./Assets/UI/WarningBlueSpriteSheet.png";

//Audio source & initialization
introMusic.src = "./Assets/Sound/Castlevania(MainScreen).mp3";
themeSong.src = "./Assets/Sound/Fire/FireStage2.mp3";
iceThemeSong.src = "./Assets/Sound/Ice/IceStage1.mp3";
finalThemeSong.src = "./Assets/Sound/FinalStage/HeartOfEnker(FinalStage).mp3"
bossVictory.src = "./Assets/Sound/StageClear.mp3";
enemyIsDamaged.src = "./Assets/Sound/Effects/enemyDamage.wav";
andre.src = "./Assets/Sound/EvilLaugh.mp3";
caleb.src = "./Assets/Sound/FinalStage/DeepInSpace(FinalStage).mp3";
bossVictory.load();
introMusic.load();
themeSong.load();
iceThemeSong.load();
finalThemeSong.load();
enemyIsDamaged.load();
//introMusic.play();
introMusic.loop = true; 


//Player's audio source & initialization
jumpSound.src = "./Assets/Sound/Effects/Jump.wav";
shootSound.src = "./Assets/Sound/Effects/Shoot.wav";
deathSound.src = "./Assets/Sound/Effects/heroDeath.wav";
playerDamagedSound.src = "./Assets/Sound/Effects/damage.wav";
playerOnGroundSound.src = "./Assets/Sound/Effects/touchGround.wav";
playerTeleportSound.src = "./Assets/Sound/Effects/arriving.wav";
jumpSound.load();
shootSound.load();
deathSound.load();

playerDamagedSound.load();
playerOnGroundSound.load();
playerTeleportSound.load();

//credit image objects
var creditBlock = { x: 450, y: 300, img: null };
var creditBlockImg = new Image;
creditBlockImg.src = "./Assets/UI/CreditBlock.jpg";
creditBlock.img = creditBlockImg;

var creditInt; //to scroll credits

//Initializing button position and size in arrays
var uiButton = [];
uiButton[0] = { x:560, y:292, width:280, height:120 };
uiButton[1] = { x:321, y:413, width:758, height:120 };
uiButton[2] = { x:435, y:535, width:531, height:120 };
uiButton[3] = { x:462, y:656, width:467, height:120 };
uiButton[4] = { x:0, y:800, width:100, height:100 };
uiButton[5] = { x:300, y:500, width:100, height:100 };

timerId = setInterval(updateUI, 1000/frames); //Frame refresh rate

canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);

function updateUI()
{   
    if(splashScreens)
    {
        if(splash1)
        {
           surface.drawImage(studioLogo, 0, 0);
           setTimeout(function(){ splash1 = false; }, 3000);
        }
        else if(!splash1 && !splash2 )
        {
           splashTransition();
        }
        else if(splash2)
        {
           surface.drawImage(engineLogo, 0, 0);
           setTimeout(function(){ splashTransitionTime = 0.0; splash2 = false; splashHolder = true; }, 2000);
        }

    }

    if(!splashScreens)
        {
             clear();
             move();
             draw();
             animateLogo();
        }  
}

function splashTransition()
{
    surface.fillStyle = "rgba(0,0,0, 0.2)";
    surface.fillRect(0, 0, canvas.width, canvas.height);
    splashTransitionTime += 0.1;

        if (splashTransitionTime >= 3 && !splashHolder) 
        {
            splash2 = true;
        }
        else if (splashTransitionTime >= 1 &&  splashHolder) 
        {
            splashScreens = false;
            introMusic.play();
        }

}


function clear(){
    surface.clearRect(0, 0, canvas.width, canvas.height);
}

function move()
{
    backgroundY -= speed;
    if(backgroundY == -1 * canvas.height)
    {
        backgroundY = 0;
    }
    //Code substracts value of cometSize which is used to scale img when drawing
    //Once it reaches zero, process is reversed until fully scaled
    if(cometSize == cometWidth){
        cometRotate = -1;
    }
    if(cometSize == 0){
        cometRotate = 1;
    }
    cometSize += cometRotate;
}

function draw()
{
	surface.drawImage(bgImage, 0, backgroundY);
	surface.drawImage(logoImage,  logoIndex * 1000, 0, 1000, 500,		// Source rectangle.
                                               200, -75, 1000, 500);	// Dest rectangle.

	surface.drawImage(playImage, uiButton[0].x, uiButton[0].y);
    surface.drawImage(instructImage, uiButton[1].x, uiButton[1].y);
	surface.drawImage(settingsImage, uiButton[2].x, uiButton[2].y);
	surface.drawImage(creditsImage, uiButton[3].x, uiButton[3].y);
    if(cometVisible === true){
        surface.drawImage(cometImage, cometX[0] - (cometSize/2), cometY[0], cometSize, cometHeight);
        surface.drawImage(cometImage, cometX[1] - (cometSize/2), cometY[1], cometSize, cometHeight);
    }
}

//Animate logo

function animateLogo()
{
   if (currentLogoFrame == maxLogoFrames)
    {
        logoIndex++;
        currentLogoFrame = 0;
        if (logoIndex == 4)
            logoIndex = 0;
    }

    currentLogoFrame++;
}

function checkPos(mouseEvent)
{
    if(mouseEvent.pageX || mouseEvent.pageY == 0){
        mouseX = mouseEvent.pageX - this.offsetLeft;    //Get mouse position
        mouseY = mouseEvent.pageY - this.offsetTop;
    }
    else if(mouseEvent.offsetX || mouseEvent.offsetY == 0){ // Overcome browser methods compatibility
        mouseX = mouseEvent.offsetX;
        mouseY = mouseEvent.offsetY;
    }

    for(i = 0; i < uiButton.length-2; i++) //Cycle through buttons 
    {
        //Check if mouse is within horizontal bound of a button
        if((mouseX > uiButton[i].x) && (mouseX < (uiButton[i].x + uiButton[i].width)))
        {
            //If the Y statement is true then mouse must be over a button
            if((mouseY > uiButton[i].y) && (mouseY < (uiButton[i].y + uiButton[i].height))) 
            {
                cometVisible = true; //Show comet icon besides the buttons when mouse hovers
                //Setting the image position to right and left of buttons
                cometX[0] = uiButton[i].x - (cometWidth/2) - 2;
                cometY[0] = uiButton[i].y + 2;
                cometX[1] = uiButton[i].x + uiButton[i].width + (cometWidth/2);
                cometY[1] = uiButton[i].y + 2;
                break;
            }
            else{
                cometVisible = false;
            }
        }
        
    }
}

//Checking for mouse clicks
function checkClick(mouseEvent)
{
    for(var i = 0; i < uiButton.length; i++)
    {
        //Check mouse position
        if(mouseX > uiButton[i].x && mouseX < uiButton[i].x + uiButton[i].width)
        {
            if(mouseY > uiButton[i].y && mouseY < uiButton[i].y + uiButton[i].height)
            {
                switch(i)
                {
                    case 0:                                             
                        clearInterval(timerId);
                        fadeId = setInterval(function(){fadeOut(0)}, 1000/frames);
                    break;
					case 1:
						clearInterval(timerId);
						fadeId1 = setInterval(function(){fadeOut(1)}, 1000/frames);
						
					break;
					case 2:
						clearInterval(timerId);
						fadeId2 = setInterval(function(){fadeOut(2)}, 1000/frames);
						
					break;
					case 3:
						clearInterval(timerId);
						fadeId3 = setInterval(function(){fadeOut(3)}, 1000/frames);
						creditInt=setInterval(scrollCredits, 50);
						
					break;
					case 4:
						clearInterval(timerId);
						fadeId4 = setInterval(function(){fadeOut(4)}, 1000/frames);
					break;
					case 5:
						clearInterval(timerId);
						fadeId5 = setInterval(function(){fadeOut(5)}, 1000/frames);
					break;
                    
                    
                 }
               
            }
        }
    }
}

function fadeOut(menuChoice) //Fades out screen on click of either options
{
    
    surface.fillStyle = "rgba(0,0,0, 0.2)";
    surface.fillRect(0, 0, canvas.width, canvas.height);
    time += 0.1;
    if (time >= 3) 
    { //Gives fade out illusion
        if (menuChoice === 0) 
        {    
            canvas.removeEventListener("mousemove", checkPos);
            canvas.removeEventListener("mouseup", checkClick);           
            clearInterval(fadeId);    
            initGame();
            Game_Timer();    
        }
		if(menuChoice===1)
		{
			clearInterval(fadeId1); 
			surface.drawImage(instructBg, 0, 0,1400,900);
			         
			surface.drawImage(backBtn, uiButton[4].x, uiButton[4].y);
			         
               
			
		}
		if(menuChoice===2)
		{
			clearInterval(fadeId2); 
			surface.drawImage(settingBg, 0, 0,1400,900);
			     
			surface.drawImage(backBtn, uiButton[4].x, uiButton[4].y);
			 surface.drawImage(soundBtn, uiButton[5].x, uiButton[5].y);        
               
			
		}
		  if(menuChoice===3)
		{
			           
            clearInterval(fadeId3);
			//timerId = setInterval(updateUI, 1000/frames);
			surface.drawImage(creditBg, 0, 0);
			
			
			surface.drawImage(backBtn, uiButton[4].x, uiButton[4].y);
			
		} 
         if(menuChoice===4)
		{
			           
            clearInterval(fadeId4);
			clearInterval(creditInt);	
			timerId = setInterval(updateUI, 1000/frames);
		}   
        if(menuChoice===5)
		{			           
            clearInterval(fadeId5);
            if(playSounds==true)
                {   
                    introMusic.pause();
                    playSounds=false;
                }
                else if(playSounds == false)
                {
                     playSounds = true;
                     introMusic.play();
                }
		}           
    }
}

function scrollCredits() {
   
   
    if (creditBlock.y >= -650) {
        creditBlock.y -= 2;
		
        //Draw Credits
        surface.drawImage(creditBlock.img, creditBlock.x, creditBlock.y);
    }
    else {
        creditBlock.y = 900;
        
    }
}



