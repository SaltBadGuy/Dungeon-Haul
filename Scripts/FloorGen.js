/**
 * Created by Callum on 05/03/2017.
 */

/**
 * Heavily based on Alistair McMonnies' random maze generator given in university labs, was the inspiration for this whole game in fact.
 * Generates the floor tiles in a grid of i x j dimensions. Tiles are intended to be 32x32.
 * @param game
 * @param cfs
 * @param scalenum
 * @constructor
 */
function GenerateFloor(game, cfs, scalenum) {
    /** cellsize -Used to determine the size (in pixels) of the cells
     * gridwidth -Used to determine the width of the grid, later used to orientate the grid to the top and right of the screen*/

    console.log("Grid size is " + cfs.gridwidth);
    console.log("Grid width gap is " + cfs.gridwidthgap);
    console.log("Grid height gap is " + cfs.gridheightgap);

    var i;
    var j;
    var GridReturn;

    /*GridArr = [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
        [9, 10],
        [11, 12],
        [13, 14],
        [15, 16],
        [17, 18],
        [19, 20],
        [21, 22],
        [23, 24],
        [25, 26],
        [27, 28],
        [29, 30],
        [31, 32],
        [33, 34],
        [35, 36],
        [37, 38]
    ];*/

    cfs.EnemyArr.length = 0;
    cfs.ChestArr.length = 0;

    for (i = cfs.width; i >= 0; i--) {
        for (j = cfs.height; j >= 0; j--) {
            //Generates a basic tile proto to populate the array
            console.log(i + ", " + j);
            cfs.GridArr[i][j] = new TileProto(game, cfs.gridwidthgap + (cfs.cellsize * i), (cfs.cellsize * j), 'DHFloor', cfs.scalenum);

        }
    }
    //Creates a series of bedrock tiles around the perimeter of the map
    for (i = cfs.width; i >= 0; i--) {
        for (j = cfs.height; j >= 0; j--) {
            cfs.GridArr[0][j].TileType = 1;
            cfs.GridArr[i][0].TileType = 1;
            cfs.GridArr[cfs.width][j].TileType = 1;
            cfs.GridArr[i][cfs.height].TileType = 1;

        }
    }

    // Generate a 'grid' of walls with floor tile_image (cells) between them...
    for (i = 1; i < (cfs.height - 1); i += 2) {
        for (j = 1; j < (cfs.width - 1); j += 2) {
            console.log(i + ", " + j);
            cfs.GridArr[i][j].TileType = 0;
        }
    }

    // First open up cells - every other row/column is FLOOR...
    //this.generateCells(height, width);
    // Now follow the Binary Tree algorithm to generate the paths between cells...
    for (i = 1; i < cfs.height - 1; i += 2) {
        for (j = 1; j < cfs.width - 1; j += 2) {
            if (Math.random() < 0.5) {
                cfs.GridArr[i][j + 1].TileType = 0;
            } else {
                cfs.GridArr[i + 1][j].TileType = 0;
            }
        }
    }
    // Finally need to clear a path at the bottom and right...
    for (j = 2; j < cfs.width - 2; j += 2) {
        cfs.GridArr[cfs.height - 2][j].TileType = 0;
    }
    for (i = 2; i < cfs.height - 2; i += 2) {
        cfs.GridArr[i][cfs.width - 2].TileType = 0;
    }
    // And define the ways in and out...
    var PlayerSpawned = false;
    var StairsSpawned = false;
    do {
        i = 2 * parseInt((Math.random() * cfs.width / 3), 10) + 1;
        console.log(parseInt((Math.random() * cfs.width / 3), 10));
        j = 2 * parseInt((Math.random() * cfs.width / 3), 10) + 1;
        //Generate Player Spawn Tile if it doesn't exist
        if (PlayerSpawned === false){
            if (cfs.GridArr[i][j].TileType === 0) {
                console.log("Spawning Player");
                cfs.GridArr[i][j].TileType = 5;
                PlayerSpawned = true;
            }
        }
        //Generate Staircase tile
        if (StairsSpawned === false){
            if (cfs.GridArr[i][j].TileType === 0) {
                console.log("Spawning Staircase");
                cfs.GridArr[i][j].TileType = 6;
                StairsSpawned = true;
            }
        }
    }while (PlayerSpawned === false || StairsSpawned === false);

    console.log("Escaped the loop with PlayerSpawned " + PlayerSpawned + " and StairsSpawned " + StairsSpawned);

    var ChestPool = parseInt((Math.random() *  2), 10) + 3;
    var EnemyPool = parseInt((Math.random() *  5), 10) + 3;
    do {
        i = parseInt((Math.random() *  cfs.width - 1), 10);
        j = parseInt((Math.random() *  cfs.width - 1), 10);

        if (cfs.GridArr[i][j].TileType === 0) {
            cfs.GridArr[i][j].TileType = 3;
            ChestPool--;
        }
        if (ChestPool === 0){
            break;
        }
    } while (ChestPool > 0);

    do {
        i = parseInt((Math.random() *  cfs.height - 1), 10);
        j = parseInt((Math.random() *  cfs.height - 1), 10);

        if (cfs.GridArr[i][j].TileType === 0) {
            cfs.GridArr[i][j].TileType = 4;
            EnemyPool--;
        }
        if (EnemyPool === 0){
            break;
        }
    } while (EnemyPool > 0);




    for (i = cfs.width; i >= 0; i--) {
        for (j = cfs.height; j >= 0; j--) {
            GridReturn = new MakeObject(game, cfs.GridArr[i][j], i, j, cfs.GridArr[i][j].TileXPos, cfs.GridArr[i][j].TileYPos, 'DHFloor', 'DHBedrock', 'DHWall', 'DHChest', 'DHEnemy', 'DHPC', 'DHStairs', cfs.scalenum, cfs.PC, cfs.EnemyArr, cfs.ChestArr, cfs.StairObject);
        }
    }
}