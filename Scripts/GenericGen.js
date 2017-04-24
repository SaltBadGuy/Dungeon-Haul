/**
 * Created by Callum on 02/03/2017.
 */

/**GENERATE QUALITY
 * Use an RNG value from 0 to 100 to determine quality. Quality is an int used as a multiplier for stats and is listed below
 * 1 = Mythical - 3x Mulitplier
 * 2-10 = Masterpiece - 2x Mulitplier
 * 11 - 50 = Magical - 1.5x Mulitplier
 * 51 - 100 = Common - 1x Mulitplier
 * @return {*}
 * @constructor
 */

function GenerateQuality() {
    var RNG = parseInt((Math.random() *  100), 10);
    console.log("RNG for quality was rolled as " + RNG);
    if (RNG === 1) {
        return 3;
    }
    else if (RNG > 1 && RNG < 11) {
        return 2;
    }
    else if (RNG > 10 && RNG < 51) {
        return 1.5;
    }
    else {
        return 1;
    }
}

/**
 * Generates a certain amount of passives from a pool.
 * -Passive is the effect
 * -PassiveX is the power/chance of the effect
 * -ID is used to keep track of what items give what passives
 * The Quality multiplier determines how many passives are made
 * If the Quality multiplier is 1 (Common), no passives are generated.
 * @param IDParam
 * @param Quality
 * @return {string}
 * @constructor
 */
function GeneratePassive(IDParam, Quality){
    var ChosenPassives = [];
    console.log(ChosenPassives);
    var PassiveAmount;
    var PassiveArray = [
        "Lifesteal", "Critical", "Burn", "Parry"
    ];
    if (Quality === 1){
        PassiveAmount = 0;
    }
    else if (Quality === 1.5){
        PassiveAmount = 1;
    }
    else if (Quality === 2){
        PassiveAmount = 2;
    }
    else if (Quality === 3){
        PassiveAmount = 3;
    }
    for (var i = 0; i < PassiveAmount; i++){
        console.log(ChosenPassives);
        ChosenPassives[i] = new NewPassive(IDParam, PassiveArray, Quality)
        console.log(ChosenPassives);
    }
    for (i = 0; i < ChosenPassives.length; i++) {
        console.log("The Passives rolled were " + ChosenPassives[i].Passive + ChosenPassives[i].PassiveX);
    }
    return ChosenPassives;
}

function NewPassive(IDParam, PassiveArray, Quality) {
    var GeneratedPassive = {
        ID: 0,
        Passive: "AAA",
        PassiveX: "AAA"
    };
    GeneratedPassive.ID = IDParam;
    GeneratedPassive.Passive = PassiveArray[Math.floor(Math.random() * PassiveArray.length)];
    GeneratedPassive.PassiveX = Quality * (Math.floor(Math.random() * 5)) + 1;
    return GeneratedPassive;
}

/**
 *
 * @return {string}
 * @constructor
 */
function GenerateType(){
    var TypeArr = [
        "Helmet", "ChestArmour", "Weapon"
    ];
    var ChosenType = TypeArr[Math.floor(Math.random() * TypeArr.length)];
    return ChosenType;
}