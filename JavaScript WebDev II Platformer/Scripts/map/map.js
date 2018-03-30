//Map
const SIZE=100;
FROWS = 4;
FCOLS = 85;

// Indexes and counters for animations
var frameLavaIndex = 0; 	// Index of the Lava sprite to display via drawImage.
var currentLavaFrame = 0; 	// Counter for the Lava frames.
var maxLavaFrames = 1; 		// The number of frames in a single Lava sprite is drawn.

var frameBackgroundIndex = 0; 	// Index of the Background sprite to display via drawImage.
var currentBackgroundFrame = 0; 	// Counter for the Backgroundframes.
var maxBackgroundFrames = 3; 		// The number of frames a single Background sprite is drawn.

//crating objects for all map tiles
var topLeft = new Image();
topLeft.src = "./Assets/LevelTiles/FireLevel/TopLeft.png";

var botLeft = new Image();
botLeft.src = "./Assets/LevelTiles/FireLevel/BottLeft.png";

var topMid = new Image();
topMid.src = "./Assets/LevelTiles/FireLevel/TopMid.png";

var center = new Image();
center.src = "./Assets/LevelTiles/FireLevel/Center.png";

var topRight = new Image();
topRight.src = "./Assets/LevelTiles/FireLevel/TopRight.png";

var botRight = new Image();
botRight.src = "./Assets/LevelTiles/FireLevel/BottRight.png";

var lavaTop = new Image();
lavaTop.src = "./Assets/LevelTiles/FireLevel/lavaTopSprite.png";

var lavaBot = new Image();
lavaBot.src = "./Assets/LevelTiles/FireLevel/lavaBotSprite.png";

var leftCorner = new Image();
leftCorner.src = "./Assets/LevelTiles/FireLevel/leftCorner.png";

var rightCorner = new Image();
rightCorner.src = "./Assets/LevelTiles/FireLevel/rightCorner.png";

var middle = new Image();
middle.src = "./Assets/LevelTiles/FireLevel/middle.png";

var middleBot = new Image();
middleBot.src = "./Assets/LevelTiles/FireLevel/middleBot.png";

var rightPlatform = new Image();
rightPlatform.src = "./Assets/LevelTiles/FireLevel/rightPlatform.png";

var leftPlatform = new Image();
leftPlatform.src = "./Assets/LevelTiles/FireLevel/leftPlatform.png";

var centerCorners= new Image();
centerCorners.src = "./Assets/LevelTiles/FireLevel/centerCorners.png";

var black = new Image();
black.src = "./Assets/LevelTiles/FireLevel/black.png";

var background = new Image();
background.src = "./Assets/LevelTiles/FireLevel/backgroundSprite.png";

var gameOverbg = new Image();
gameOverbg.src = "./Assets/UI/GameOver.png";

var gameWinbg = new Image();
gameWinbg.src = "./Assets/UI/VictoryScreen.png";

var rightSideWithCorner = new Image();
rightSideWithCorner.src = "./Assets/LevelTiles/FireLevel/rightSideWithCorner.png";

var singlePlatform = new Image();
singlePlatform.src = "./Assets/LevelTiles/FireLevel/singlePlatform.png";


//Creating the map
var map =[
    [0,0,0,0,0,0,11,0,0,16,0,0,0, 0,0,0,0,0,0,0,0, 0,0,14,13,0,1,5, 0,0,14,13,0,0,0, 0,0,0,0,0,0,0,0,11,0,0,16,0,0, 0,0,0,0,0,0,0, 0,0,0, 0, 0,0,16,0, 0, 0,0,0,0,0,11,0, 0,0,16,0, 0,0,16,0, 0,0,16,0,0],
    [0,0,0,0,0,1,15,0,0, 0,0,0,1, 5,0,0,0,0,0,0,0,11,0, 0, 0,0,2,6, 0,0, 0, 0,0,0,0,11,0,0,0,0,0,1,3,15,0,0, 0,0,1, 5,0,0,0,0,0,0,11,0,0,14,13,0, 0,0,14,13,0,0,0,1,15,0,11,0, 0,0,16,0, 0,0,16,0, 0,0,0],
    [1,3,3,3,3,9, 6,7,7, 7,7,7,2,10,3,3,3,3,3,3,3,12,3, 3, 3,3,9,6, 7,7, 7, 7,7,7,1,12,3,3,3,3,3,9,4, 6,7,7, 7,7,2,10,3,3,3,3,3,3,15,7,7, 7, 7,7, 7,7, 7, 7,7,7,1,9,10,3,12,5, 7,7, 7,7, 7,7, 7,7, 7,1,5],
    [2,4,4,4,4,4, 6,8,8, 8,8,8,2, 4,4,4,4,4,4,4,4, 4,4, 4, 4,4,4,6, 8,8, 8, 8,8,8,2, 4,4,4,4,4,4,4,4, 6,8,8, 8,8,2, 4,4,4,4,4,4,4, 6,8,8, 8, 8,8, 8,8, 8, 8,8,8,2,4, 4,4, 4,6, 8,8, 8,8, 8,8, 8,8, 8,2,6]
];

//A set interval to animate Lava & Background
var idInt2 =setInterval(update2, 350);
var idInt4 = setInterval(backUpdate, 75);

function generateMap()
{
    //Generating MAP.
    for (var row = 0; row < FROWS; row++)
    {
        for (var col = 0; col < FCOLS; col++)
        {
            var tempTile = {};
            tempTile.x=col*SIZE;
            tempTile.y=(5+row)*SIZE;
            tempTile.aRock=false; //If the image is a tile
            tempTile.empty=false; //If there is an empty image
            tempTile.lava=false; // If the image is lava
            tempTile.smallPlatform = false; // If the image is a small platform
            switch(map[row][col])
            {
                case 0:
                    tempTile.img=black;
                    tempTile.empty=true;
                    break;
                case 1:
                    tempTile.img=topLeft;
                    tempTile.aRock=true;
                    break;
                case 2:
                    tempTile.img=botLeft;
                    tempTile.aRock=true;
                    break;
                case 3:
                    tempTile.img=topMid;
                    tempTile.aRock=true;
                    break;
                case 4:
                    tempTile.img=center;
                    tempTile.aRock=true;
                    break;
                case 5:
                    tempTile.img=topRight;
                    tempTile.aRock=true;
                    break;
                case 6:
                    tempTile.img=botRight;
                    tempTile.aRock=true;
                    break;
                case 7:
                    tempTile.img=lavaTop;
                    tempTile.lava=true;
                    break;
                case 8:
                    tempTile.img=lavaBot;
                    tempTile.lava=true;
                    break;
                case 9:
                    tempTile.img=leftCorner;
                    tempTile.aRock=true;
                    break;
                case 10:
                    tempTile.img=rightCorner;
                    tempTile.aRock=true;
                    break;
                case 11:
                    tempTile.img=middle;
                    tempTile.aRock=true;
                    break;
                case 12:
                    tempTile.img=centerCorners;
                    tempTile.aRock=true;
                    break;
                case 13:
                    tempTile.img=rightPlatform;
                    tempTile.aRock=true;
                    break;
                case 14:
                    tempTile.img=leftPlatform;
                    tempTile.aRock=true;
                    break;
                case 15:
                    tempTile.img=rightSideWithCorner;
                    tempTile.aRock=true;
                    break;
                case 16:
                    tempTile.img=singlePlatform;
                    tempTile.aRock=true;
                    tempTile.smallPlatform = true;
                    break;
				 case 17:
                    tempTile.img=middleBot;
                    tempTile.aRock=true;
                    break;
            }
            map[row][col] = tempTile;
        }
    }
}

function update2()
{
    animateLava();
}

function backUpdate()
{
    animateBackground();
}

function animateLava()
{
	//To animate the Lava top & botom images     
    if (currentLavaFrame == maxLavaFrames)
    {
        frameLavaIndex++;
        currentLavaFrame = 0;
        if (frameLavaIndex == 2)
            frameLavaIndex = 0;
    }
    currentLavaFrame++;
}

function animateBackground()
{
	//To animate the Background image 
    currentBackgroundFrame++;
    if (currentBackgroundFrame == maxBackgroundFrames)
    {
        frameBackgroundIndex++;
        currentBackgroundFrame = 0;
        if (frameBackgroundIndex == 4)
            frameBackgroundIndex = 0;
    }
}