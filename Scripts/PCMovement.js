/**
 * Created by Callum on 05/03/2017.
 */

/**
 * Simple Movement
 * @param PC
 * @param game
 * @param GridArr
 * @param InCombat
 * @constructor
 */
function PCMoveUp(PC, game, GridArr, InCombat){
    if(!InCombat.InCombat) {
        var TryMove;
        TryMove = false;
        console.log("Before moving the grid was (" + PC.GridX + "," + PC.GridY + ")");
        if (GridArr[PC.GridX][PC.GridY - 1].TileType === 2 || GridArr[PC.GridX][PC.GridY - 1].TileType === 1) {
            if(PC.PicksActive === true && GridArr[PC.GridX][PC.GridY - 1].TileType === 2){
                console.log("Destroying Wall!");
                GridArr[PC.GridX][PC.GridY - 1].TileSprite.kill();
                GridArr[PC.GridX][PC.GridY - 1].TileType = 0;
                PC.PicksActive = false;
            }
            else {
                TryMove = false;
                console.log("Tried to move into a wall!");
            }
        }
        else {
            TryMove = true;
        }
        if (TryMove) {
            PC.pcsprite.y -= 32;
            PC.GridY--;
        }
        console.log("After moving the grid was (" + PC.GridX + "," + PC.GridY + ")");
    }
    else{
        console.log("In Combat, not moving");
    }
}

function PCMoveDown(PC, game, GridArr, InCombat){
    if(!InCombat.InCombat) {
        var TryMove;
        TryMove = false;
        console.log("Before moving the grid was (" + PC.GridX + "," + PC.GridY + ")");
        if (GridArr[PC.GridX][PC.GridY + 1].TileType === 2 || GridArr[PC.GridX][PC.GridY + 1].TileType === 1) {
            if(PC.PicksActive === true && GridArr[PC.GridX][PC.GridY + 1].TileType === 2){
                console.log("Destroying Wall!");
                GridArr[PC.GridX][PC.GridY + 1].TileSprite.kill();
                GridArr[PC.GridX][PC.GridY + 1].TileType = 0;
                PC.PicksActive = false;
            }
            else {
                TryMove = false;
                console.log("Tried to move into a wall!");
            }
        }
        else {
            TryMove = true;
        }
        if (TryMove) {
            PC.pcsprite.y += 32;
            PC.GridY++;
        }
        console.log("After moving the grid was (" + PC.GridX + "," + PC.GridY + ")");
    }
    else{
        console.log("In Combat, not moving");
    }
}

function PCMoveLeft(PC, game, GridArr, InCombat){
    if(!InCombat.InCombat) {
        var TryMove;
        TryMove = false;
        console.log("Before moving the grid was (" + PC.GridX + "," + PC.GridY + ")");
        if (GridArr[PC.GridX - 1][PC.GridY].TileType === 2 || GridArr[PC.GridX - 1][PC.GridY].TileType === 1) {
            if(PC.PicksActive === true && GridArr[PC.GridX - 1][PC.GridY].TileType === 2){
                console.log("Destroying Wall!");
                GridArr[PC.GridX - 1][PC.GridY].TileSprite.kill();
                GridArr[PC.GridX - 1][PC.GridY].TileType = 0;
                PC.PicksActive = false;
            }
            else {
                TryMove = false;
                console.log("Tried to move into a wall!");
            }
        }
        else {
            TryMove = true;
        }
        if (TryMove) {
            PC.pcsprite.x -= 32;
            PC.GridX--;
        }
        console.log("After moving the grid was (" + PC.GridX + "," + PC.GridY + ")");
    }
    else{
        console.log("In Combat, not moving");
    }
}

function PCMoveRight(PC, game, GridArr, InCombat){
    if(!InCombat.InCombat) {
        var TryMove;
        TryMove = false;
        console.log("Before moving the grid was (" + PC.GridX + "," + PC.GridY + ")");
        if (GridArr[PC.GridX + 1][PC.GridY].TileType === 2 || GridArr[PC.GridX + 1][PC.GridY].TileType === 1) {
            if(PC.PicksActive === true && GridArr[PC.GridX + 1][PC.GridY].TileType === 2){
                console.log("Destroying Wall!");
                GridArr[PC.GridX + 1][PC.GridY].TileSprite.kill();
                GridArr[PC.GridX + 1][PC.GridY].TileType = 0;
                PC.PicksActive = false;
            }
            else {
                TryMove = false;
                console.log("Tried to move into a wall!");
            }
        }
        else {
            TryMove = true;
        }
        if (TryMove) {
            PC.pcsprite.x += 32;
            PC.GridX++;
        }
        console.log("After moving the grid was (" + PC.GridX + "," + PC.GridY + ")");
    }
    else{
        console.log("In Combat, not moving");
    }
}