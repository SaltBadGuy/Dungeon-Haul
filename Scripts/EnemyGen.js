/**
 * Created by Callum on 02/03/2017.
 */
function GenerateEnemy(game, EnemyID, xpos, ypos, EnemyArr, scalenum, CurrentFloor){
    EnemyID++;
    var Quality = GenerateQuality();
    console.log("The Enemy Quality multiplier is " + Quality);
    var ENSTRStat = (1 + (CurrentFloor/20)) *  (Quality * parseInt((Math.random() *  10), 10) + 20);
    var ENPassive = GeneratePassive(EnemyID, Quality);
    console.log(ENPassive);
    //var ENPassiveX = GeneratePassiveX(ENPassive, Quality);
    console.log("the rolled values for a new enemy were " +  Quality  + ", " +  ENSTRStat + ", " +  ENPassive + ", ");
    var GeneratedEnemy = new EnemyProto(game, xpos, ypos, EnemyID, Quality, ENSTRStat, ENPassive, scalenum);
    console.log("the rolled values for a new enemy were " +  GeneratedEnemy.Quality + ", " +  GeneratedEnemy.ENSTRStat + ", " +  GeneratedEnemy.ENPassive);
    EnemyArr.push(GeneratedEnemy);
}
