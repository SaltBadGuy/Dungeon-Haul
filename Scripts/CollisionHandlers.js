/**
 * Created by Callum on 07/03/2017.
 */


/**
 * Collision event between player and chest, checks what loot the chest has and will display equipment's stats. Items are taken automatically whille equipment must be taken with Space bar. Looted Chests are destroyed in each update cycle.
 * @param game
 * @param PC
 * @param ChestArr
 * @param HudText
 * @param TextEvents
 * @constructor
 */
function CheckChest(game, PC, ChestArr, HudText, TextEvents){
    console.log(PC);
    console.log(ChestArr);
    console.log(ChestArr.ChestLoot);
    console.log(ChestArr.Looted);
    console.log("Chest Collision");
    /**This checks the chest's content and automatically add items to the player's collection.
     * For Equipment,  */
    if (ChestArr.ChestLoot === "Potion" && ChestArr.Looted === false){
        console.log("Looted a potion!");
        var Delay = {
            Delay: -1000
        }
        CombatTextGen(game, PC.pcsprite.x, PC.pcsprite.y, "Got a potion!", "", false, TextEvents, Delay);
        PC.PCPots++;
        ChestArr.Looted = true;
    }
    else if (ChestArr.ChestLoot === "Pick" && ChestArr.Looted === false){
        console.log("Looted a pick!");
        var Delay = {
            Delay: -1000
        }
        CombatTextGen(game, PC.pcsprite.x, PC.pcsprite.y, "Got a pick!", "", false, TextEvents, Delay);
        PC.PCPicks++;
        ChestArr.Looted = true;
    }
     else if (ChestArr.ChestLoot === "Curse" && ChestArr.Looted === false){
        console.log("Looted a curse!");
        var Delay = {
            Delay: -1000
        }
        CombatTextGen(game, PC.pcsprite.x, PC.pcsprite.y, "Got a curse!", "", false, TextEvents, Delay);
        PC.PCCursess++;
        ChestArr.Looted = true;
    }
    else if (ChestArr.ChestLoot instanceof PCEquipProto && ChestArr.Looted === false){
        if(ChestArr.ChestLoot.Type === "Helmet"){
            console.log("Looted a helmet!");
            console.log (PC.PCHeadEquip);

            var Title;
            if (ChestArr.ChestLoot.Quality === 1){
                Title = "Common ";
            }
            else if (ChestArr.ChestLoot.Quality === 1.5){
                Title = "Magical ";
            }
            else if (ChestArr.ChestLoot.Quality === 2){
                Title = "Epic ";
            }
            else if (ChestArr.ChestLoot.Quality === 3){
                Title = "Mythical ";
            }

            HudText.TextElement1.setText(Title + "Chest");
            if (ChestArr.ChestLoot.EquipPassive.length > 0){
                EquipPassivesString = "and ";
                PassiveStringConcat = "";
                for (i = 0; i < ChestArr.ChestLoot.EquipPassive.length; i++){
                    PassiveStringConcat = PassiveStringConcat.concat(" and " + ChestArr.ChestLoot.EquipPassive[i].Passive + " " + ChestArr.ChestLoot.EquipPassive[i].PassiveX + "%");
                    EquipPassivesString = PassiveStringConcat;
                }
            }
            else{
                EquipPassivesString = "";
            }
            HudText.TextElement2.setText("Contains a Helmet with " + ChestArr.ChestLoot.PCSTRStat + " STR" + EquipPassivesString+ ", press Space to equip");
            HudText.TextElement1.alpha = 1;
            HudText.TextElement2.alpha = 1;

            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                PC.PCHeadEquip = ChestArr.ChestLoot;
                console.log(PC.PCHeadEquip);
                ChestArr.Looted = true;
                HudText.TextElement1.alpha = 0;
                HudText.TextElement2.alpha = 0;
            }
        }
        if(ChestArr.ChestLoot.Type === "ChestArmour"){
            console.log("Looted a ChestPlate!");
            console.log (PC.PCChestEquip);

            var Title;
            if (ChestArr.ChestLoot.Quality === 1){
                Title = "Common ";
            }
            else if (ChestArr.ChestLoot.Quality === 1.5){
                Title = "Magical ";
            }
            else if (ChestArr.ChestLoot.Quality === 2){
                Title = "Epic ";
            }
            else if (ChestArr.ChestLoot.Quality === 3){
                Title = "Mythical ";
            }

            HudText.TextElement1.setText(Title + "Chest");
            if (ChestArr.ChestLoot.EquipPassive.length > 0){
                EquipPassivesString = "and ";
                PassiveStringConcat = "";
                for (i = 0; i < ChestArr.ChestLoot.EquipPassive.length; i++){
                    PassiveStringConcat = PassiveStringConcat.concat(" and " + ChestArr.ChestLoot.EquipPassive[i].Passive + " " + ChestArr.ChestLoot.EquipPassive[i].PassiveX + "%");
                    EquipPassivesString = PassiveStringConcat;
                }
            }
            else{
                EquipPassivesString = "";
            }
            HudText.TextElement2.setText("Contains a Chestplate with " + ChestArr.ChestLoot.PCSTRStat + " STR" + EquipPassivesString + ", press Space to equip");
            HudText.TextElement1.alpha = 1;
            HudText.TextElement2.alpha = 1;

            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                PC.PCChestEquip = ChestArr.ChestLoot;
                console.log(PC.PCChestEquip);
                ChestArr.Looted = true;
                HudText.TextElement1.alpha = 0;
                HudText.TextElement2.alpha = 0;
            }
        }
        if(ChestArr.ChestLoot.Type === "Weapon"){
            console.log("Looted a Weapon!");
            console.log (PC.PCWeaponEquip);

            var Title;
            if (ChestArr.ChestLoot.Quality === 1){
                Title = "Common ";
            }
            else if (ChestArr.ChestLoot.Quality === 1.5){
                Title = "Magical ";
            }
            else if (ChestArr.ChestLoot.Quality === 2){
                Title = "Epic ";
            }
            else if (ChestArr.ChestLoot.Quality === 3){
                Title = "Mythical ";
            }

            HudText.TextElement1.setText(Title + "Chest");
            if (ChestArr.ChestLoot.EquipPassive.length > 0){
                EquipPassivesString = "and ";
                PassiveStringConcat = "";
                for (i = 0; i < ChestArr.ChestLoot.EquipPassive.length; i++){
                    PassiveStringConcat = PassiveStringConcat.concat("and " + ChestArr.ChestLoot.EquipPassive[i].Passive + " " + ChestArr.ChestLoot.EquipPassive[i].PassiveX + "%");
                    EquipPassivesString = PassiveStringConcat;
                }
            }
            else{
                EquipPassivesString = "";
            }
            HudText.TextElement2.setText("Contains a Weapon with " + ChestArr.ChestLoot.PCSTRStat + " STR" + EquipPassivesString + ", press Space to equip");
            HudText.TextElement1.alpha = 1;
            HudText.TextElement2.alpha = 1;


            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                PC.PCWeaponEquip = ChestArr.ChestLoot;
                console.log(PC.PCWeaponEquip);
                ChestArr.Looted = true;
                HudText.TextElement1.alpha = 0;
                HudText.TextElement2.alpha = 0;
            }
        }
    }
    console.log("BYEP");
}
/**
 * Collision event between player and enemy, sends them into combat
 * @param game
 * @param timerEvents
 * @param textEvents
 * @param PC
 * @param Enemy
 * @param InCombat
 * @param Turn
 * @constructor
 */
function ColliderEnemy(game, timerEvents, textEvents, PC, Enemy, InCombat, Turn) {
    if (InCombat.InCombat === false) {
        console.log("Enemy Collision!");
        InCombat.InCombat = true;
        Combat(game, timerEvents, textEvents, PC, Enemy, InCombat, Turn);
    }
}

/**
 * A large amount of parameters are sent for potential PlayGen. The player must press space to actually head to the next floor and the TextElements change to tell the player this.
 * @param game
 * @param height
 * @param width
 * @param cellsize
 * @param gridwidth
 * @param gridheight
 * @param gridwidthgap
 * @param gridheightgap
 * @param GridArr
 * @param EnemyArr
 * @param ChestArr
 * @param scalenum
 * @param PC
 * @param StairObject
 * @param EnemyID
 * @param ChestID
 * @param EquipID
 * @param CurrentFloor
 * @param HudText
 * @return {*}
 * @constructor
 */
function ColliderStairs(game, height, width, cellsize, gridwidth, gridheight, gridwidthgap, gridheightgap, GridArr, EnemyArr, ChestArr, scalenum, PC, StairObject, EnemyID, ChestID, EquipID, CurrentFloor, HudText){
    console.log("Stair Collision!");

        var ReturnStuff;
        ReturnStuff = PlayGen(game, height, width, cellsize, gridwidth, gridheight, gridwidthgap, gridheightgap, GridArr, EnemyArr, ChestArr, scalenum, PC, StairObject, EnemyID, ChestID, EquipID, CurrentFloor);
        console.log(ReturnStuff);
        HudText.TextElement1.alpha = 0;
        HudText.TextElement2.alpha = 0;
        return ReturnStuff;
}

function ColliderStairsCall(){
    HudText.TextElement1.setText("Staircase");
    HudText.TextElement2.setText("Press Space to go to the next floor");
    HudText.TextElement1.alpha = 1;
    HudText.TextElement2.alpha = 1;
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        FloorStuff = ColliderStairs(game, height, width, cellsize, gridwidth, gridheight, gridwidthgap, gridheightgap, GridArr, EnemyArr, ChestArr, scalenum, PC, StairObject, EnemyID, ChestID, EquipID, CurrentFloor, HudText);
    }
    GridArr = FloorStuff.GridArr;
    PC = FloorStuff.PC;
    StairObject = FloorStuff.StairObject;
    CurrentFloor = FloorStuff.CurrentFloor;

    console.log(FloorStuff);
}

