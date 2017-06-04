/**
 * Created by Callum on 07/04/2017.
 */

/**
 * Used to generate floors and all objects with it, accessed at game start and when players descend floors.
 * @param game
 * @param cfs
 * @return {{}}
 * @constructor
 */
function PlayGen(game, cfs){
    console.log(GridArr);
    console.log(PC);
    console.log(StairObject);

    console.log("Creating a new floor!");

    cfs.CurrentFloorNum++;

    new GenerateFloor(game, cfs);

    console.log(cfs.GridArr);
    console.debug(cfs.PC);

    new SpawnPlayer(game, cfs);
    console.debug(cfs.PC);

    new GenerateThings(game, cfs);

    for (var i = 0; i < cfs.width - 1; i++){
        for (var j = 0; j < cfs.height - 1; j++){
            if (cfs.GridArr[i][j].TileType === 6){
                console.log("Found Stairs");
                cfs.StairObject = cfs.GridArr[i][j];
            }
        }
    }

}