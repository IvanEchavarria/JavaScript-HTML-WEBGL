var inTransition = false;
var finalArea = false;
var transitionToIceLevel = false;
var transitionToFinalStage = false;
var gameOver = false;
var transitionTime = 0.0;
var gameTimer = 0;
var mainUpdateInterval;
var stageSelection = 0;
var divHealthBar = document.getElementById("healthBar");
var divHealthP = document.getElementById("healthPercentage");
var maxKenHealth = false;


function initGame() {   
    maxKenHealth = true; 
    divHealthBar.style.visibility = "visible";
    divHealthP.style.visibility = "visible";
    introMusic.pause();
    if(playSounds)
    {
       themeSong.play();
       themeSong.loop = true;
    }        
    mainUpdateInterval = setInterval(update, 1000/frames);
    arriveToStage();   
}


function update() {
    
    handleInput();  
    collision();      
    scrollMap();   
    
    if(!transitionToIceLevel && !transitionToFinalStage)
        {
            for (var i = 0; i < fireWalker.length; i++)
                fireWalker[i].move();

            fireWalkerCollision();
            for (var i = 0; i < fireWolf.length; i++)
                fireWolf[i].move();

            fireWolfCollision();
            moveBoss();
            fireBossCollision();
        }  
    if(transitionToIceLevel && !transitionToFinalStage)
        {
            for (var i = 0; i < iceWalker.length; i++)
                 iceWalker[i].move();

             iceWalkerCollision();
             for (var i = 0; i < iceBear.length; i++)
                 iceBear[i].move();

             iceBearCollision();
             moveiceBoss();
	         iceBossCollision();
        }
      if(finalArea)
        {
            moveFinalBoss(); 
			finalBossCollision();
        } 

   
    render();
    
}

function teleportOut()
{    
    
    frameIndex = 0;
    player.img = images[14];        
    playerTeleportSound.play();
    setTimeout(fadeInterval, 667);
    setTimeout(divHealthBarVisibility,2500);
}

function fadeInterval()
{
    
    stageArrivalDrawPermit = false;
    clearInterval(playerAnimationIntervalID);
    stageArrival = true;
    stageDeparture = false;
    inTransition = true;   
    divHealthBar.style.visibility = "hidden";
   	divHealthP.style.visibility = "hidden";      
    fadeTransition = setInterval(function(){screenTransition()}, 1000/frames);
}

function screenTransition()
{
    surface.fillStyle = "rgba(0,0,0, 0.2)";
    surface.fillRect(0, 0, canvas.width, canvas.height);
    transitionTime += 0.1;

    if (transitionTime >= 5) 
    {
        if(stageSelection === 1) // Load stage 1 ice level
        {       
            clearInterval(fadeTransition);
            themeSong.pause();
            generateIceMap();
            createIceBears();
            createIceWalkers();              
            transitionToIceLevel = true;
            player.x = 300;
            player.y = 600;
			if(playSounds)
			{
				iceThemeSong.play();
				iceThemeSong.loop = true;
			}
            transitionTime = 0.0;  
            stageArrivalTimer = 0;
            inTransition = false;                    
            arriveToStage();               
        }
        if(stageSelection === 2) // Load Final Stage
        {
			clearInterval(fadeTransition);
			iceThemeSong.pause();
            generateFinalMap();
            finalArea = true;			
			transitionToFinalStage = true;
			player.x = 100;
			player.y = 600;
			if(playSounds)
			{
				finalThemeSong.play();
				finalThemeSong.loop = true;
			}
            transitionTime = 0.0;  
            stageArrivalTimer = 0;
            inTransition = false;    
            end = true;                
            arriveToStage();
        }
    }
}

// New
function toIceLevel(){
    alert('To next level , Coming SOON!...');
}

function gameEnd()
{  
   clearInterval(mainUpdateInterval);
   renderGameOver();
   setTimeout(closeTab,5000);

}

function gameWin()
{  
   clearInterval(mainUpdateInterval);
   renderYouWin();
   andre.play();
   //caleb.play();
}

function closeTab()
{   
    open(location, '_self').close(); 
}

function Game_Timer()
{
	gameTimer++;
	setTimeout(Game_Timer, 1000);
}

function divHealthBarVisibility()
{
   divHealthBar.style.visibility = "visible";
   divHealthP.style.visibility = "visible";
}