/**
 * Created by Callum on 05/03/2017.
 */
/**
 * Generates players, enemies, chests and staircases on the tiles marked for them.
 * @param game
 * @param cfs
 * @constructor
 */
function GenerateThings(game, cfs) {
    for (i = 0; i < (cfs.height); i++) {
        for (j = 0; j < (cfs.width); j++) {
            if (cfs.GridArr[i][j].TileType === 3) {
                /**Generates a chest object which is pushed into the ChestArr array.*/
                console.log(cfs.PC);
                var chestpos ={
                    xpos: cfs.GridArr[i][j].TileXPos,
                    ypos: cfs.GridArr[i][j].TileYPos
                };
                new GenerateChest(game, cfs, chestpos);
                cfs.ChestID++;
                console.log(cfs.ChestArr);
                /**If the chest generated a Equipment, the EquipID gets increased to match.*/
                if (cfs.ChestArr[cfs.ChestArr.length - 1].ChestLoot instanceof PCEquipProto) {
                    console.log("Equipment was generated, increasing EquipID from " + cfs.EquipID + "...");
                    cfs.EquipID++;
                    console.log("... to " + cfs.EquipID);
                }
            }
            else if (cfs.GridArr[i][j].TileType === 4) {
                /**Generates a Enemy object which is pushed into the EnemyArr array.*/
                var enemypos ={
                    xpos: cfs.GridArr[i][j].TileXPos,
                    ypos: cfs.GridArr[i][j].TileYPos
                };
                new GenerateEnemy(game, cfs, enemypos);
                console.log(EnemyID);
            }
        }
    }
}

