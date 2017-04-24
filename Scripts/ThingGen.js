/**
 * Created by Callum on 05/03/2017.
 */
/**
 * Generates players, enemies, chests and staircases on the tiles marked for them.
 * @param game
 * @param height
 * @param width
 * @param GridArr
 * @param EnemyArr
 * @param EnemyID
 * @param ChestArr
 * @param ChestID
 * @param EquipID
 * @param scalenum
 * @constructor
 */
function GenerateThings(game, height, width, GridArr, EnemyArr, EnemyID, ChestArr, ChestID, EquipID, scalenum, PC, CurrentFloor) {
    for (i = 0; i < (height); i++) {
        for (j = 0; j < (width); j++) {
            if (GridArr[i][j].TileType === 3) {
                /**Generates a chest object which is pushed into the ChestArr array.*/
                console.log(PC);
                GenerateChest(game, ChestID, EquipID, GridArr[i][j].TileXPos, GridArr[i][j].TileYPos, ChestArr, scalenum, PC, CurrentFloor);
                ChestID++;
                /**If the chest generated a Equipment, the EquipID gets increased to match.*/
                if (ChestArr[ChestArr.length - 1].ChestLoot instanceof PCEquipProto) {
                    console.log("Equipment was generated, increasing EquipID from " + EquipID + "...");
                    EquipID++;
                    console.log("... to " + EquipID);
                }
            }
            else if (GridArr[i][j].TileType === 4) {
                /**Generates a Enemy object which is pushed into the EnemyArr array.*/
                GenerateEnemy(game, EnemyID, GridArr[i][j].TileXPos, GridArr[i][j].TileYPos, EnemyArr, scalenum, CurrentFloor);
                console.log(EnemyID);
            }
        }
    }
}