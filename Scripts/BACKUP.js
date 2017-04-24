/**
 * Created by Callum on 05/04/2017.
 */
/**
 * Created by Callum on 24/02/2017.
 */


function Combat(game, combatEvent, Player, Enemy, InCombat) {
    console.log("Starting Combat!");
    console.log(InCombat);
    console.log(Player);

    var CombatTurn = {
        Turn: true
    };

    var Burn = {
        PBurn: 0,
        EBurn: 0
    }
    console.log("At the start of combat, player HP was at " + Player.PCCURHP);
    console.log("At the start of combat, enemy HP was at " + Enemy.ENHP);
    combatEvent.push(game.time.events.loop(1000, function () {
        WhoAttacks(game, combatEvent, Player, Enemy, CombatTurn, InCombat)
    }, this));
    console.log(combatEvent);
}

/**
 *
 * @param game
 * @param combatEvent
 * @param Player
 * @param Enemy
 * @param Turn
 * @param InCombat
 * @constructor
 */
function WhoAttacks(game, combatEvent, Player, Enemy, Turn, Burn, InCombat) {
    /**Determines which character has their turn.
     * true = player's turn
     * false = enemy's turn*/
    console.log(combatEvent);
    console.log(Player);
    console.log(Player.PCCURHP);
    console.log(Enemy);
    console.log(Enemy.ENHP);
    console.log(Turn.Turn);

    var PassiveEffects = {
        Parry: 1,
        Lifesteal: 0,
        Critical: 1
    };



    if (Player.PCCURHP < 1 || Enemy.ENHP < 1){
        console.log("Ending combat");
        if (Player.PCCURHP <= 0){
            console.log("Destroying Player");
            Player.pcsprite.destroy();
            game.time.events.removeAll(combatEvent);
        }
        if (Enemy.ENHP <= 0){
            console.log("Destroying Enemy");
            Enemy.enemysprite.destroy();
            game.time.events.removeAll(combatEvent);
        }
    }
    if (Turn.Turn === true) {
        if (Player.PCCURHP > 0 || Enemy.ENHP > 0) {
            console.log("Player's turn to attack!");
            PlayerAttack(game, Player, Enemy, Turn, PassiveEffects, Burn);
        }
    }
    else {
        if (Player.PCCURHP > 0 || Enemy.ENHP > 0) {
            console.log("Enemy's turn to attack!");
            EnemyAttack(game, Player, Enemy, Turn, PassiveEffects, Burn);
        }
    }
}

function DealDamage(P, A, D, AHP, DHP, AATK, DDEF, Burn, Turn){
    var ActualDamage;
    ActualDamage = P.Parry * (P.Critcal * (AATK - DDEF));
    if (Turn) {
        A.PCCURHP += ((ActualDamage / 100) * P.Lifesteal);
        D.ENHP -= ActualDamage;
        D.ENHP -= Burn.EBurn;
    }
    else{
        A.ENHP += ((ActualDamage / 100) * P.Lifesteal);
        D.PCCURHP -= ActualDamage;
        D.PCCURHP -= Burn.PBurn;
    }
}


/**
 *
 * @param game
 * @param Player
 * @param Enemy
 * @param Turn
 * @param PassiveEffects
 * @constructor
 */
function PlayerAttack(game, Player, Enemy, Turn, PassiveEffects, Burn) {

    console.log("The turn is " + Turn.Turn);
    console.log("Player is about to attack!");
    console.log("Enemy HP was at " + Enemy.ENHP);
    console.log("The enemy Passive length is " + Enemy.ENPassive.length + " and the player passive length is " + Player.PCPassive.length);
    for (var i = 0; i < Player.PCPassive.length || i < Enemy.ENPassive.length; i++) {
        ApplyPassive(game, Player, Enemy, EstBaseDamage, Player.PCPassive[i], Enemy.ENPassive[i], Turn, Burn);
    }
    DealDamage(PassiveEffects, Player, Enemy, Player.PCCURHP, Enemy.ENHP, Player.PCPATK, Enemy.ENPDEF, Turn);
    console.log("Now Enemy HP is " + Enemy.ENHP);
    Turn.Turn = false;
}

/**
 * @param game
 * @param Player
 * @param Enemy
 * @param Turn
 * @return {boolean}
 * @constructor
 */
function EnemyAttack(game, Player, Enemy, Turn, PassiveEffects, Burn) {

    console.log("The turn is " + Turn.Turn);console.log("Player HP was at " + Player.PCCURHP);
    console.log("The enemy Passive length is " + Enemy.ENPassive.length + " and the player passive length is " + Player.PCPassive.length);
    for (var i = 0; i < Enemy.ENPassive.length || i < Player.PCPassive.length; i++) {
        ApplyPassive(game, Player, Enemy, Player.PCPassive[i], Enemy.ENPassive[i], Turn, PassiveEffects, Burn);
    }
    DealDamage(PassiveEffects, Player, Enemy, Player.PCCURHP, Enemy.ENHP, Player.PCPATK, Enemy.ENPDEF, Turn);
    console.log("Now Player HP is " + Player.PCCURHP);
    Turn.Turn = true;
}

function ApplyPassive(game, PC, Enemy, PPassive, EPassive, Turn, PassiveEffects, Burn) {
    //Calling RNG to check passives
    var RNG = parseInt((Math.random() *  100), 10);
    console.log(Turn.Turn);
    console.log("RNG Roll this round is " + RNG);
    if (Turn.Turn === true) {
        /**Passives belonging to the player that activate when the player is attacking*/
        if (PPassive.Passive === "Lifesteal") {
            console.log("Activating Player's Lifesteal");
            PassiveEffects.Lifesteal = PPassive.PassiveX;
        }
    }
    else if (PPassive.Passive === "Critical") {
        console.log("Attempting Player's Critical");
        if (RNG < PPassive.PassiveX) {
            console.log("Activating Player's Critical");
            PassiveEffects.Critical = 2;
        }
        else {
            console.log("Critical Failed");
        }
    }
    else if (PPassive.Passive === "Burn") {
        Burn.PBurn += PPassive.PassiveX;
        console.log("Player's Burn Applied! Currently " + PBurn)
    }
    /**Passives belonging to the enemy that activate when the player is attacking*/
    else if (EPassive.Passive === "Parry") {
        console.log("Getting attacked, attempting Enemy's Parry");
        if (RNG < EPassive.PassiveX) {
            console.log("Activating Player's Parry");
            PassiveEffects.Parry = 0;
        }
        else {
            console.log("Parry Player's Failed");
        }
    }
    /**When it's the enemy's turn*/
    else {
        if (EPassive.Passive === "Lifesteal") {
            console.log("Activating Enemy's Lifesteal");
            PassiveEffects.Lifesteal = EPassive.PassiveX;
        }
        else if (EPassive.Passive === "Critical") {
            console.log("Attempting Enemy's  Critical");
            if (RNG < EPassive.PassiveX ) {
                console.log("Activating Enemy's  Critical");
                PassiveEffects.Critical = 2;
            }
            else {
                console.log("Enemy's Critical Failed");
            }

        }
        else if (EPassive.Passive === "Burn") {
            Burn.EBurn += EPassive.PassiveX;
            console.log("Enemy's Burn Applied! Currently " + EBurn)
        }
        else if (PPassive.Passive === "Parry") {
            console.log("Getting attacked, attempting Player's  Parry");
            if (RNG < PPassive.PassiveX) {
                console.log("Activating Players's Parry");
                PassiveEffects.Parry = 0;
            }
            else {
                console.log("Player's Parry Failed");
            }
        }
    }
}