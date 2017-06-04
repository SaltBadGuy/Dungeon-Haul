/**
 * Created by Callum on 02/03/2017.
 */

/**
 * Either creates a whole new player or spawns them at their new intended position on floor generation
 * @param game
 * @param cfs
 * @return {*}
 * @constructor
 */
function SpawnPlayer(game, cfs) {
    console.log(cfs.GridArr);
    console.log(cfs.PC);
    for (i = 0; i < (cfs.height); i++) {
        for (j = 0; j < (cfs.width); j++) {
            if (cfs.GridArr[i][j].TileType === 5) {
                if (Object.getOwnPropertyNames(cfs.PC).length === 0)
                {
                    var GeneratedPlayer = new GeneratePlayer(game, cfs.GridArr, cfs.GridArr[i][j].TileXPos, cfs.GridArr[i][j].TileYPos, i, j, cfs.scalenum);
                    console.log(GeneratedPlayer);
                    cfs.PC = GeneratedPlayer;
                }
                else{
                    cfs.PC.GridX = i;
                    cfs.PC.GridY = j;
                    cfs.PC.pcsprite.x = cfs.GridArr[i][j].TileXPos;
                    cfs.PC.pcsprite.y = cfs.GridArr[i][j].TileYPos;
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