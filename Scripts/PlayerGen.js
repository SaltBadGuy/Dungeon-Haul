/**
 * Created by Callum on 02/03/2017.
 */

/**
 * Either creates a whole new player or spawns them at their new intended position on floor generation
 * @param game
 * @param PC
 * @param height
 * @param width
 * @param GridArr
 * @param scalenum
 * @return {*}
 * @constructor
 */
function SpawnPlayer(game, PC, height, width, GridArr, scalenum) {
    console.log(GridArr);
    console.log(PC);
    for (i = 0; i < (height); i++) {
        for (j = 0; j < (width); j++) {
            if (GridArr[i][j].TileType === 5) {
                if (Object.getOwnPropertyNames(PC).length === 0)
                {
                    var GeneratedPlayer = new GeneratePlayer(game, GridArr, GridArr[i][j].TileXPos, GridArr[i][j].TileYPos, i, j, scalenum);
                    console.log(GeneratedPlayer);
                    PC = GeneratedPlayer;
                    console.log(PC);
                    return PC;
                }
                else{
                    PC.GridX = i;
                    PC.GridY = j;
                    PC.pcsprite.x = GridArr[i][j].TileXPos;
                    PC.pcsprite.y = GridArr[i][j].TileYPos;
                    return PC;
                }
            }
        }
    }
}

/**
 * Genereates a new player character
 * @param game
 * @param GridArr
 * @param xpos
 * @param ypos
 * @param GridX
 * @param GridY
 * @param scalenum
 * @return {PCCharProto}
 * @constructor
 */
function GeneratePlayer(game, GridArr, xpos, ypos, GridX, GridY, scalenum) {
    this.PCGen = new PCCharProto(game, GridArr, xpos, ypos, GridX, GridY, scalenum);
    this.PCGen.pcsprite.scale.setTo(scalenum, scalenum);
    console.log(this.PCGen);
    return this.PCGen;
}