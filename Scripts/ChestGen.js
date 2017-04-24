/**
 * Created by Callum on 02/03/2017.
 */

/**
 * Generates the chest with a loot object inside.
 * @param game
 * @param ChestID
 * @param EquipID
 * @param xpos
 * @param ypos
 * @param ChestArr
 * @param scalenum
 * @param PC
 * @constructor
 */
function GenerateChest(game, ChestID, EquipID, xpos, ypos, ChestArr, scalenum, PC,CurrentFloor){
    console.log(PC); //Shows PCProto, as intended
    var loot = GenerateLoot(game, EquipID, ChestID, PC, CurrentFloor);
    console.log(loot); //Shows GenerateLoot
    var GeneratedChest = new ChestProto(game, ChestID, xpos, ypos, loot, scalenum);
    console.log("Generated Chest is " + GeneratedChest.ChestLoot);
    ChestArr.push(GeneratedChest);
    console.log("JOBS DONE");
    for (var i = 0; i < ChestArr.length; i++){
        console.log(ChestArr[i]);
    }
}

/**
 * Decides whether to generate a Equipment loot or a Item Loot
 * @param game
 * @param EquipID
 * @param PC
 * @return {*}
 * @constructor
 */
function GenerateLoot(game, EquipID, ChestID, PC, CurrentFloor){
    console.log(PC); //Shows Undefined
    var Loot;
    RNG = parseInt((Math.random()) * 2, 10);

    console.log ("RNG for loot gen is " + RNG);
    if (RNG === 0) {
        console.log("Generating Equipment for Chest " + ChestID);
        Loot = GenerateEquip(game, EquipID, PC, CurrentFloor);
        console.log(Loot);
        return Loot;
    }
    else {
        Loot = GenerateItem(game,PC);
        console.log(Loot);
        return Loot;
    }
}

/**
 * Generates Equipment and stores it in the loot variable to be placed in the Chest's ChestLoot Object
 * @param game
 * @param EquipID
 * @param PC
 * @return {PCEquipProto}
 * @constructor
 */
function GenerateEquip(game, EquipID, PC, CurrentFloor){
    var EquipType = GenerateType();
    var Quality = GenerateQuality();
    console.log("The Quality multiplier is " + Quality);
    var GotEquip = true;
    if (EquipType === "Helmet") {
        var PCSTRStat = (1 + (CurrentFloor/20)) * (Quality * parseInt((Math.random() *  10), 10) + 5);
    }
    else if (EquipType === "ChestArmour"){
        PCSTRStat = (1 + (CurrentFloor/20)) *  (Quality * parseInt((Math.random() *  10), 10) + 15);
    }
    else if (EquipType === "Weapon"){
        PCSTRStat = (1 + (CurrentFloor/20)) *  (Quality * parseInt((Math.random() *  10), 10) + 25);
    }
    var Passive = GeneratePassive(EquipID, Quality);
    //var Passive1X = GeneratePassiveX(Passive1, Quality);
    console.log("the rolled values for a new helmet were " +  Quality + ", " +  GotEquip + ", " +  PCSTRStat + ", " +  Passive);
    Equip = new PCEquipProto(game, EquipID, EquipType, Quality, GotEquip, PCSTRStat, Passive);
    return Equip;
    //PCPassives[0];
}

/**
 * Generates an item:
 * -Potion: Heals 25% of the player's Maximum HP
 * -Pick: Used to break non-bedrock walls
 * -Curse: When used, will allow the player to instantly win their next combat
 * Similarly to how passives are stored, items are stored as strings and then evaluated later on
 * @param game
 * @param PC
 * @return {*}
 * @constructor
 */
function GenerateItem(game, PC){
    console.log(PC);
    var string = "AAAAAAA";
    console.log(string);
    var RNG = parseInt((Math.random() *  10), 10);
    console.log ("RNG for item gen is " + RNG);
    if (RNG <= 6) {
        console.log ("Generated a Potion");
        string = "Potion";
       //PC.PCPots++;
    }
    else if (RNG > 6 || RNG <= 9){
        console.log ("Generated a Pick");
        string = "Pick";
        //PC.PCPicks++;
    }
    else{
        console.log ("Generated a Curse");
        string = "Curse";
        //PC.PCCurses++;
    }
    console.log(string);
    return string;
}
