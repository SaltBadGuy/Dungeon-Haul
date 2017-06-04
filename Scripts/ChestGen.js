/**
 * Created by Callum on 02/03/2017.
 */

/**
 * Generates the chest with a loot object inside.
 * @param game
 * @param cfs
 * @param pos
 * @constructor
 */
function GenerateChest(game, cfs, pos){
    console.log(PC); //Shows PCProto, as intended
    var loot = GenerateLoot(game, cfs.EquipID, cfs.ChestID, cfs.PC, cfs.CurrentFloorNum);
    console.log(loot); //Shows GenerateLoot
    console.log(cfs.ChestID);
    var GeneratedChest = new ChestProto(game, cfs, pos.xpos, pos.ypos, loot);
    console.log(GeneratedChest);
    cfs.ChestArr.push(GeneratedChest);
    for (var i = 0; i < cfs.ChestArr.length; i++){
        console.log(cfs.ChestArr[i]);
    }
}

/**
 * Decides whether to generate a Equipment loot or a Item Loot
 * @param game
 * @param cfs
 * @return {*}
 * @constructor
 */
function GenerateLoot(game, cfs){
    console.log(cfs.PC); //Shows Undefined
    var Loot;
    RNG = parseInt((Math.random()) * 2, 10);

    console.log ("RNG for loot gen is " + RNG);
    if (RNG === 0) {
        console.log("Generating Equipment for Chest " + cfs.ChestID);
        Loot = GenerateEquip(game, cfs);
        console.log(Loot);
        return Loot;
    }
    else {
        Loot = GenerateItem(game, cfs.PC);
        console.log(Loot);
        return Loot;
    }
}

/**
 * Generates Equipment and stores it in the loot variable to be placed in the Chest's ChestLoot Object
 * @param game
 * @param cfs
 * @return {PCEquipProto}
 * @constructor
 */
function GenerateEquip(game, cfs){
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
    var Passive = GeneratePassive(cfs.EquipID, Quality);
    console.log("the rolled values for a new helmet were " +  Quality + ", " +  GotEquip + ", " +  PCSTRStat + ", " +  Passive);
    Equip = new PCEquipProto(game, cfs.EquipID, EquipType, Quality, GotEquip, PCSTRStat, Passive);
    return Equip;
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
    var RNG = parseInt((Math.random() *  10), 10);
    console.log ("RNG for item gen is " + RNG);
    if (RNG <= 6) {
        console.log ("Generated a Potion");
        string = "Potion";
    }
    else if (RNG > 6 || RNG <= 9){
        console.log ("Generated a Pick");
        string = "Pick";
    }
    else{
        console.log ("Generated a Curse");
        string = "Curse";
    }
    console.log(string);
    return string;
}