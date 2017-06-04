/**
 * Created by Callum on 02/03/2017.
 */
/**
 * Generates enemies
 * @param game
 * @param cfs
 * @param pos
 * @constructor
 */
function GenerateEnemy(game, cfs, pos){
    cfs.EnemyID++;
    var Quality = GenerateQuality();
    console.log("The Enemy Quality multiplier is " + Quality);
    var ENSTRStat = (1 + (cfs.CurrentFloorNum/20)) *  (Quality * parseInt((Math.random() *  10), 10) + 20);
    var ENPassive = GeneratePassive(cfs.EnemyID, Quality);
    console.log(ENPassive);
    //var ENPassiveX = GeneratePassiveX(Passives, Quality);
    console.log("the rolled values for a new enemy were " +  Quality  + ", " +  ENSTRStat + ", " +  ENPassive + ", ");
    var GeneratedEnemy = new EnemyProto(game, pos.xpos, pos.ypos, cfs.EnemyID, Quality, ENSTRStat, ENPassive, cfs.scalenum);
    console.log("the rolled values for a new enemy were " +  GeneratedEnemy.Quality + ", " +  GeneratedEnemy.STRStat + ", " +  GeneratedEnemy.Passives);
    cfs.EnemyArr.push(GeneratedEnemy);
}


