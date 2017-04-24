/**
 * Created by Callum on 06/03/2017.
 */

function EquipTestHelmet(game, PC, EquipID){

    var Quality = GenerateQuality();
    console.log("The Quality multiplier is " + Quality);
    var GotEquip = true;
    var PCSTRStat = Quality * parseInt((Math.random() *  10), 10) + 5;
    var Passives = GeneratePassive(EquipID, Quality);
    console.log(Passives);
    EquipID++;
    console.log("the rolled values for a new helmet were " +  Quality + ", " +  GotEquip + ", " +  PCSTRStat + ", " +  Passives + ", ");
    PC.PCHeadEquip = new PCEquipProto(game, EquipID, "Helmet", Quality, GotEquip, PCSTRStat, Passives);
    for (var i = 0; i < PC.PCHeadEquip.EquipPassive.length; i++) {
        PC.PCPassive.push(PC.PCHeadEquip.EquipPassive[i]);
    }
}

function EquipTestChestPlate(game, PC, EquipID){
    var Quality = GenerateQuality();
    console.log("The Quality multiplier is " + Quality);
    var GotEquip = true;
    var PCSTRStat = Quality * parseInt((Math.random() *  10), 10) + 15;
    var Passives = GeneratePassive(EquipID, Quality);
    console.log(Passives);
    EquipID++;
    console.log("the rolled values for a new helmet were " +  Quality + ", " +  GotEquip + ", " +  PCSTRStat + ", " +  Passives + ", ");
    PC.PCChestEquip = new PCEquipProto(game, EquipID, "ChestPlate", Quality, GotEquip, PCSTRStat, Passives);
    for (var i = 0; i < PC.PCChestEquip.EquipPassive.length; i++) {
        PC.PCPassive.push(PC.PCChestEquip.EquipPassive[i]);
    }
}

function EquipTestWeapon(game, PC, EquipID){

    var Quality = GenerateQuality();
    console.log("The Quality multiplier is " + Quality);
    var GotEquip = true;
    var PCSTRStat = Quality * parseInt((Math.random() *  10), 10) + 25;
    var Passives = GeneratePassive(EquipID, Quality);
    console.log(Passives);
    EquipID++;
    console.log("the rolled values for a new helmet were " +  Quality + ", " +  GotEquip + ", " +  PCSTRStat + ", " +  Passives + ", ");
    PC.PCWeaponEquip = new PCEquipProto(game, EquipID, "Weapon", Quality, GotEquip, PCSTRStat, Passives);
    for (var i = 0; i < PC.PCWeaponEquip.EquipPassive.length; i++) {
        PC.PCPassive.push(PC.PCWeaponEquip.EquipPassive[i]);
    }
}

function TestCombat(game, PC, timerEvents, EnemyArr){
    Combat(game, timerEvents, PC, EnemyArr[0]);
}

function HurtPlayer() {

}