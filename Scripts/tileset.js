/**
 * Created by alistair mcmonnies on 03/02/2014.
 */

/*globals Image, document, window, console*/

/*
 * Define a tile map to draw on the canvas.  Canvas size is calculated from the
 * number of tiles (rows & columns) - the default is 31 rows of 41 columns.
 * If a tile is 16x16 pixels, this is 656 x 496.
 */
var canvas,                 // Canvas element
    context,                // 2D Drawing Context
    tileSet,                // Main object - a set of tiles with maze algorithms
    TILE_SIZE = 16,         // Image size of one tile
    NUM_ROWS = 31,          // Default number of rows...
    NUM_COLS = 41,          // ... and columns
    FLOOR = 0,              // Tile indexes in the graphic
    WALL = 1,               // ..
    ENTRANCE = 2,           // ..
    EXIT = 3;               // ..

/**
 * A useful random number function.  Generates a random integer, no smaller than min,
 * no bigger than max.
 * @param min
 * @param max
 * @returns {*}
 */
function randomIntInRange(min, max) {
    "use strict";
    var span = max - min + 1,
        v = Math.random();
    return Math.floor(v * span) + min;
}

/**
 * An object that defines, models and generates sets of tiles with mazes.
 * @param num_rows
 * @param num_cols
 * @constructor
 */
var TileSet = function (num_rows, num_cols) {
    "use strict";
    var i, j;
    this.num_rows = num_rows;
    this.num_cols = num_cols;
    this.map = [];
    this.tile_image = null;
    this.clear();
};
/**
 * Clears the tile set and resets every cell to a WALL tile.
 * @param rows
 * @param cols
 */
TileSet.prototype.clear = function (rows, cols) {
    "use strict";
    var i, j;
    // Sort out the maze size (must be odd width and height)...
    rows += rows % 2 ? 0 : 1;
    cols += cols % 2 ? 0 : 1;
    this.num_rows = rows;
    this.num_cols = cols;
    // Generate the tile map...
    this.map = [];
    for (i = 0; i < this.num_rows; i += 1) {
        this.map[i] = [];
        for (j = 0; j < this.num_cols; j += 1) {
            this.map[i][j] = WALL;
        }
    }
};
/**
 * Draws the current tile set on the specified 2D Graphics Context
 * @param ctx
 * @param tile_size
 */
TileSet.prototype.drawTiles = function (ctx, tile_size) {
    "use strict";
    var destx,
        desty,
        srcx,
        row,
        col;

    for (row = 0; row < this.num_rows; row += 1) {
        for (col = 0; col < this.num_cols; col += 1) {
            destx = col * tile_size;
            desty = row * tile_size;
            srcx = this.map[row][col] * tile_size;
            ctx.drawImage(this.tile_image, srcx, 0, tile_size, tile_size, destx, desty, tile_size, tile_size);
        }
    }
};
/**
 * Generates a maze into the tile set using the binary tree algorithm.
 * This is basically...
 *      Go along each cell (surrounded by 4 walls) in the maze, opening up
 *      either the wall on the right or the wall below - chosen at random.
 * This type of maze has a South-East bias.
 */
TileSet.prototype.generateBinaryTreeMaze = function () {
    "use strict";
    var i,
        j,
        height = this.map.length,
        width = this.map[0].length;
    // First open up cells - every other row/column is FLOOR...
    this.generateCells(height, width);
    // Now follow the Binary Tree algorithm to generate the paths between cells...
    for (i = 1; i < height - 3; i += 2) {
        for (j = 1; j < width - 3; j += 2) {
            if (Math.random() < 0.5) {
                this.map[i][j + 1] = FLOOR;
            } else {
                this.map[i + 1][j] = FLOOR;
            }
        }
    }
    // Finally need to clear a path at the bottom and right...
    for (j = 2; j < width - 2; j += 2) {
        this.map[height - 2][j] = FLOOR;
    }
    for (i = 2; i < height - 2; i += 2) {
        this.map[i][width - 2] = FLOOR;
    }
    // And define the ways in and out...
    i = 2 * randomIntInRange(0, height / 3) + 1;
    j = 2 * randomIntInRange(0, width / 3) + 1;
    this.map[i][0] = ENTRANCE;
    this.map[0][j] = EXIT;
    this.drawTiles(context, TILE_SIZE);
};
/**
 * Choose an element in a given path, based on the selectPathAs
 * value.  This is either the last element in the path, or a
 * randomly selected element, depending on the chosen algorithm.
 * @param path - an array of [x,y] ordinates.
 * @param selectPathAs - either LAST or RANDOM
 * @returns {*}
 */
function selectPathIndex(path, selectPathAs) {
    "use strict";
    var index = null;
    switch (selectPathAs) {
        case "FIRST":
            index = 0;
            break;
        case "LAST":
            index = path.length - 1;
            break;
        case "RANDOM":
            index = Math.floor(Math.random() * path.length);
            break;
    }
    return index;
}

/**
 * Function returns only the viable neighbours from N, S, E, W,
 * and only those which have not already been visited.
 * @param tile_set
 * @param thisNode - the one we want the neighbours of
 * @param width
 * @param height
 * @returns {Array}
 */
function getNeighbours(tile_set, thisNode, width, height) {
    "use strict";
    var neighbours, goodNeighbours, n, i;
    neighbours = [];
    goodNeighbours = [];
    neighbours.push([thisNode[0] - 2, thisNode[1]]);
    neighbours.push([thisNode[0] + 2, thisNode[1]]);
    neighbours.push([thisNode[0], thisNode[1] + 2]);
    neighbours.push([thisNode[0], thisNode[1] - 2]);
    // Prune these to get only existing, unvisited thisNodes...
    for (i = 0; i < neighbours.length; i += 1) {
        n = neighbours[i];
        if (n[0] > 0 && n[0] < (height - 1) && n[1] > 0 && n[1] < (width - 1) &&
            tile_set.map[n[0]][n[1]] === WALL) {
            goodNeighbours.push(n);
        }
    }
    return goodNeighbours;
}

/**
 * This method creates a path between two adjacent nodes, setting both the
 * destination node (toNode) and the wall between it and the starting node
 * to FLOOR tiles.
 * @param tiles
 * @param fromNode
 * @param toNode
 */
function makePath(tiles, fromNode, toNode) {
    "use strict";
    var row, col;
    tiles.map[toNode[0]][toNode[1]] = FLOOR;
    row = (fromNode[0] + toNode[0]) / 2;
    col = (fromNode[1] + toNode[1]) / 2;
    tiles.map[row][col] = FLOOR;
}

/**
 * The Growing Tree maze algorithm.  This generates a "minimum spanning tree"
 * that covers the tile-set.  Basic algorithm:
 *      1. Select a node and add it to a path (a list of all the nodes that have
 *         been visited.
 *      2. From the neighbours to this node (N,S,E,W), remove the ones that have
 *         already been visited and choose one from the remainder at random.
 *      3. If there are no remaining unvisited neighbours, remove the node.
 *      4. Otherwise, add that to the path
 *      5. Choose one from the path - either the last node in the path or one at random.
 *      6. Go to step 2.  If the path is empty, the maze is complete.
 * @param nodeSelectType - says how to choose the the next node (step 5).
 */
TileSet.prototype.generateGrowingTreeMaze = function (nodeSelectType) {
    "use strict";
    var height = Math.floor(this.map.length),
        width = Math.floor(this.map[0].length),
        row,
        col,
        i,
        path = [],
        currentIndex,
        currentNode,
        goodNeighbours,
        neighbour;
    // Choose the starting cell...
    row = Math.floor(Math.random() * height);
    col = Math.floor(Math.random() * width);
    row += row % 2 ? 0 : 1;
    col += col % 2 ? 0 : 1;
    //row = 1;
    //col = 1;
    // Add it to the path...
    path.push([row, col]);
    this.map[row][col] = FLOOR;
    while (path.length > 0) {
        currentIndex = selectPathIndex(path, nodeSelectType);
        currentNode = path[currentIndex];
        // Find a valid, unvisited neighbour at random...
        goodNeighbours = getNeighbours(this, currentNode, width, height);
        if (goodNeighbours.length > 0) {
            // Pick one at random...
            i = Math.floor(goodNeighbours.length * Math.random());
            neighbour = goodNeighbours[i];
            path.push(neighbour);
            makePath(this, currentNode, neighbour);
        } else {
            path.splice(currentIndex, 1);
        }
    }
    this.map[0][1] = ENTRANCE;
    this.map[height - 2][width - 1] = EXIT;
    this.drawTiles(context, TILE_SIZE);
};

/**
 * This generates a grid of cells surrounded by walls.  For this, there must be
 * an odd number of rows and columns.
 * @param height - rows
 * @param width - columns
 */
TileSet.prototype.generateCells = function (height, width) {
    "use strict";
    var i, j;
    // Make sure width and height are both odd numbers...
    if (height % 2 === 1) {
        height += 1;
    }
    if (width % 2 === 1) {
        width += 1;
    }
    // Generate a 'grid' of walls with floor tile_image (cells) between them...
    for (i = 1; i < (height - 1); i += 2) {
        for (j = 1; j < (width - 1); j += 2) {
            this.map[i][j] = FLOOR;
        }
    }
};

/**
 * Generates a maze in the tile set, from one of three algorithms.
 */
TileSet.prototype.generateMaze = function () {
    "use strict";
    var algorithm = document.getElementById("algorithm").value;
    switch (algorithm) {
        case "bin":
            this.generateBinaryTreeMaze();
            break;
        case "gr1":
            this.generateGrowingTreeMaze("LAST");
            break;
        case "gr2":
            this.generateGrowingTreeMaze("RANDOM");
            break;
    }
};

/**
 * Loads a graphic file that contains tile graphics for FLOOR, WALL, ENTRANCE
 * and EXIT - organised as a single graphic of four tiles.
 * @param src - the URI of the file.
 */
TileSet.prototype.loadTiles = function (src) {
    "use strict";
    var me = this;
    this.tile_image = new Image();
    this.tile_image.src = src;
    this.tile_image.onload = function () {
        me.drawTiles(context, TILE_SIZE);
    };
};

/**
 * Takes the suggested width and height of the maze, and makes sure these
 * are odd numbers.   If they are even, the width or height is increased by one.
 */
function handleMazeSize() {
    "use strict";
    var r = document.getElementById("height"),
        c = document.getElementById("width");
    NUM_COLS = parseInt(c.value, 10) || NUM_COLS;
    if (NUM_COLS % 2 !== 1) {
        // Don't want an even number...
        NUM_COLS += 1;
    }
    // Update the width input box..
    c.value = NUM_COLS;
    NUM_ROWS = parseInt(r.value, 10) || NUM_ROWS;
    if (NUM_ROWS % 2 !== 1) {
        NUM_ROWS += 1;
    }
    // Update the height input box..
    r.value = NUM_ROWS;
}

function doMaze() {
    "use strict";
    handleMazeSize();
    tileSet.clear(NUM_ROWS, NUM_COLS);
    canvas.width = NUM_COLS * TILE_SIZE;
    canvas.height = NUM_ROWS * TILE_SIZE;
    tileSet.generateMaze();
}

window.onload = function () {
    "use strict";
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.width = NUM_COLS * TILE_SIZE;
    canvas.height = NUM_ROWS * TILE_SIZE;
    document.getElementById("go").onclick = doMaze;
    tileSet = new TileSet(NUM_ROWS, NUM_COLS);
    tileSet.loadTiles(".../Assets/tileset.png");
};