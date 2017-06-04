/**
 * Created by Callum on 07/03/2017.
 */


/**
 * Collision event between player and chest, checks what loot the chest has and will display equipment's stats. Items are taken automatically whille equipment must be taken with Space bar. Looted Chests are destroyed in each update cycle.
 * @param game
 * @param cfs
 * @param TargetChest
 * @param HudText
 * @param TextEvents
 * @constructor
 */
function CheckChest(game, cfs, TargetChest, HudText, TextEvents){
    console.log(cfs.PC);
    console.log(TargetChest);
    console.log(TargetChest.ChestLoot);
    console.log(TargetChest.Looted);
    console.log("Chest Collision");
    /**This checks the chest's content and automatically add items to the player's collection.
     * For Equipment,  */
    if (TargetChest.ChestLoot === "Potion" && TargetChest.Looted === false){
        console.log("Looted a potion!");
        var Delay = {
            Delay: -1000
        }
        CombatTextGen(game, cfs.PC.pcsprite.x, cfs.PC.pcsprite.y, "Got a potion!", "", false, TextEvents, Delay);
        cfs.PC.PCPots++;
        TargetChest.Looted = true;
    }
    else if (TargetChest.ChestLoot === "Pick" && TargetChest.Looted === false){
        console.log("Looted a pick!");
        var Delay = {
            Delay: -1000
        }
        CombatTextGen(cfs.game, cfs.PC.pcsprite.x, cfs.PC.pcsprite.y, "Got a pick!", "", false, TextEvents, Delay);
        cfs.PC.PCPicks++;
        TargetChest.Looted = true;
    }
     else if (TargetChest.ChestLoot === "Curse" && TargetChest.Looted === false){
        console.log("Looted a curse!");
        var Delay = {
            Delay: -1000
        }
        CombatTextGen(game, cfs.PC.pcsprite.x, cfs.PC.pcsprite.y, "Got a curse!", "", false, TextEvents, Delay);
        cfs.PC.PCCurses++;
        TargetChest.Looted = true;
    }
    else if (TargetChest.ChestLoot instanceof PCEquipProto && TargetChest.Looted === false){
        if(TargetChest.ChestLoot.Type === "Helmet"){
            console.log("Looted a helmet!");
            console.log (cfs.PC.PCHeadEquip);

            var Title;
            if (TargetChest.ChestLoot.Quality === 1){
                Title = "Common ";
            }
            else if (TargetChest.ChestLoot.Quality === 1.5){
                Title = "Magical ";
            }
            else if (TargetChest.ChestLoot.Quality === 2){
                Title = "Epic ";
            }
            else if (TargetChest.ChestLoot.Quality === 3){
                Title = "Mythical ";
            }

            HudText.TextElement1.setText(Title + "Chest");
            if (TargetChest.ChestLoot.EquipPassive.length > 0){
                EquipPassivesString = "and ";
                PassiveStringConcat = "";
                for (i = 0; i < TargetChest.ChestLoot.EquipPassive.length; i++){
                    PassiveStringConcat = PassiveStringConcat.concat(" and " + TargetChest.ChestLoot.EquipPassive[i].Passive + " " + TargetChest.ChestLoot.EquipPassive[i].PassiveX + "%");
                    EquipPassivesString = PassiveStringConcat;
                }
            }
            else{
                EquipPassivesString = "";
            }
            HudText.TextElement2.setText("Contains a Helmet with " + TargetChest.ChestLoot.PCSTRStat + " STR" + EquipPassivesString+ ", press Space to equip");
            HudText.TextElement1.alpha = 1;
            HudText.TextElement2.alpha = 1;

            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                cfs.PC.PCHeadEquip = TargetChest.ChestLoot;
                console.log(cfs.PC.PCHeadEquip);
                TargetChest.Looted = true;
                HudText.TextElement1.alpha = 0;
                HudText.TextElement2.alpha = 0;
            }
        }
        if(TargetChest.ChestLoot.Type === "ChestArmour"){
            console.log("Looted a ChestPlate!");
            console.log (cfs.PC.PCChestEquip);

            var Title;
            if (TargetChest.ChestLoot.Quality === 1){
                Title = "Common ";
            }
            else if (TargetChest.ChestLoot.Quality === 1.5){
                Title = "Magical ";
            }
            else if (TargetChest.ChestLoot.Quality === 2){
                Title = "Epic ";
            }
            else if (TargetChest.ChestLoot.Quality === 3){
                Title = "Mythical ";
            }

            HudText.TextElement1.setText(Title + "Chest");
            if (TargetChest.ChestLoot.EquipPassive.length > 0){
                EquipPassivesString = "and ";
                PassiveStringConcat = "";
                for (i = 0; i < TargetChest.ChestLoot.EquipPassive.length; i++){
                    PassiveStringConcat = PassiveStringConcat.concat(" and " + TargetChest.ChestLoot.EquipPassive[i].Passive + " " + TargetChest.ChestLoot.EquipPassive[i].PassiveX + "%");
                    EquipPassivesString = PassiveStringConcat;
                }
            }
            else{
                EquipPassivesString = "";
            }
            HudText.TextElement2.setText("Contains a Chestplate with " + TargetChest.ChestLoot.PCSTRStat + " STR" + EquipPassivesString + ", press Space to equip");
            HudText.TextElement1.alpha = 1;
            HudText.TextElement2.alpha = 1;

            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                cfs.PC.PCChestEquip = TargetChest.ChestLoot;
                console.log(PC.PCChestEquip);
                TargetChest.Looted = true;
                HudText.TextElement1.alpha = 0;
                HudText.TextElement2.alpha = 0;
            }
        }
        if(TargetChest.ChestLoot.Type === "Weapon"){
            console.log("Looted a Weapon!");
            console.log (cfs.PC.PCWeaponEquip);

            var Title;
            if (TargetChest.ChestLoot.Quality === 1){
                Title = "Common ";
            }
            else if (TargetChest.ChestLoot.Quality === 1.5){
                Title = "Magical ";
            }
            else if (TargetChest.ChestLoot.Quality === 2){
                Title = "Epic ";
            }
            else if (TargetChest.ChestLoot.Quality === 3){
                Title = "Mythical ";
            }

            HudText.TextElement1.setText(Title + "Chest");
            if (TargetChest.ChestLoot.EquipPassive.length > 0){
                EquipPassivesString = "and ";
                PassiveStringConcat = "";
                for (i = 0; i < TargetChest.ChestLoot.EquipPassive.length; i++){
                    PassiveStringConcat = PassiveStringConcat.concat("and " + TargetChest.ChestArr.ChestLoot.EquipPassive[i].Passive + " " + TargetChest.ChestArr.ChestLoot.EquipPassive[i].PassiveX + "%");
                    EquipPassivesString = PassiveStringConcat;
                }
            }
            else{
                EquipPassivesString = "";
            }
            HudText.TextElement2.setText("Contains a Weapon with " + TargetChest.ChestLoot.PCSTRStat + " STR" + EquipPassivesString + ", press Space to equip");
            HudText.TextElement1.alpha = 1;
            HudText.TextElement2.alpha = 1;


            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                cfs.PC.PCWeaponEquip = TargetChest.ChestLoot;
                console.log(PC.PCWeaponEquip);
                TargetChest.Looted = true;
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
 * Collision event between player and stairs, on the press of space will send players to the next level.
 * @param game
 * @param cfs
 * @constructor
 */
function ColliderStairs(game, cfs){
    HudText.TextElement1.setText("Staircase");
    HudText.TextElement2.setText("Press Space to go to the next floor");
    HudText.TextElement1.alpha = 1;
    HudText.TextElement2.alpha = 1;
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        FloorStuff = PlayGen(game, cfs);
    }
}

