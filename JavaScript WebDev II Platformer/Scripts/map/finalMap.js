FINALROWS = 5;
FINALCOLS = 14;

function generateFinalMap()
{
    topLeft.src = "./Assets/LevelTiles/FinalStage/TopLeft.png";
	
    botLeft.src = "./Assets/LevelTiles/FinalStage/BottLeft.png";
	
    topMid.src = "./Assets/LevelTiles/FinalStage/TopMid.png";
	
    center.src = "./Assets/LevelTiles/FinalStage/Center.png";
	
    topRight.src = "./Assets/LevelTiles/FinalStage/TopRight.png";
	
    botRight.src = "./Assets/LevelTiles/FinalStage/BottRight.png";
	
    rightPlatform.src = "./Assets/LevelTiles/FinalStage/rightPlatform.png";
	
    leftPlatform.src = "./Assets/LevelTiles/FinalStage/leftPlatform.png";
	
    background.src = "./Assets/LevelTiles/FinalStage/backgroundSprite.png";
	
    healthBarImage.src="./Assets/UI/HealthFinal.png";
	
    healthBarImage.width=500;
	
    healthBarImage.height=40;
       
    //Generating MAP.
      map = [
		[0 , 0, 0,0, 0, 0,0, 0, 0,0, 0, 0, 0,0],
		[14,13, 0,0, 0, 0,0, 0, 0,0,14,13, 0,0],
		[0 , 0, 0,0, 0, 0,0,14,13,0, 0, 0, 0,0],
		[1 , 3, 5,0,14,13,0, 0, 0,0, 1, 3, 3,5],
		[2 , 4, 6,0, 0, 0,0, 0, 0,0, 2, 4, 4,6]
	];

    for (var row = 0; row < FINALROWS; row++)
    {
        for (var col = 0; col < FINALCOLS; col++)
        {
            var tempTile = {};
            tempTile.x=col*SIZE;
            tempTile.y=(4+row)*SIZE;
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
                case 11:
                    tempTile.img=middle;
                    tempTile.aRock=true;
                    break;
                case 13:
                    tempTile.img=rightPlatform;
                    tempTile.aRock=true;
                    break;
                case 14:
                    tempTile.img=leftPlatform;
                    tempTile.aRock=true;
					tempTile.smallPlatform = true;
                    break;
            }
            map[row][col] = tempTile;
        }
    }
}