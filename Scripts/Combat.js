/**
 * Created by Callum on 24/02/2017.
 */

/**
 * Combat function, initialises the turn (Player always attacks first) and starts up the WhoAttacks loop
 * @param game
 * @param combatEvent
 * @param textEvents
 * @param Player
 * @param Enemy
 * @param InCombat
 * @constructor
 */
function Combat(game, combatEvent, textEvents, Player, Enemy, InCombat) {
    console.log("Starting Combat!");
    console.log(InCombat);
    console.log(Player);
    console.log(textEvents);

    //Player = true, Enemy = false
    var CombatTurn = {
        Turn: true
    };

    var Burn = {
        PBurn: 0,
        EBurn: 0
    };

    var Delay ={
        Delay: 0
    }
    console.log("At the start of combat, player HP was at " + Player.PCCURHP);
    console.log("At the start of combat, enemy HP was at " + Enemy.HP);
    Player.pcsprite.x -= 16;
    Enemy.sprite.x += 16;
    combatEvent.push(game.time.events.loop(1000, function () {
        WhoAttacks(game, combatEvent, textEvents, Player, Enemy, CombatTurn, Burn, InCombat, Delay)
    }, this));
    console.log(combatEvent);
}

/**
 * Depending on the turn, either the player or the enemy will attack. If curses are active, combat ends immediately with the enemy dying.
 * @param game
 * @param combatEvent
 * @param Player
 * @param Enemy
 * @param Turn
 * @param InCombat
 * @constructor
 */
function WhoAttacks(game, combatEvent, textEvents, Player, Enemy, Turn, Burn, InCombat, Delay) {
    /**Determines which character has their turn.
     * true = player's turn
     * false = enemy's turn*/
    console.log(combatEvent);
    console.log(textEvents);
    console.log(Player);
    console.log(Player.PCCURHP);
    console.log(Enemy);
    console.log(Enemy.HP);
    console.log(Turn.Turn);
    console.log("STARTING A NEW WHOATTACKS");

    var PassiveEffects = {
        Parry: 1,
        Lifesteal: 0,
        Critical: 1
    };

    console.log(Delay.Delay);
    Delay.Delay = 0;

    if (Player.PCCURHP < 1 || Enemy.HP < 1 || Player.CursesActive === true) {
        console.log("Ending combat");
        if (Player.PCCURHP <= 0) {
            console.log("Destroying Player");
            Player.pcsprite.destroy();
            game.time.events.removeAll(combatEvent);
            InCombat.InCombat = false;
        }
        if (Enemy.HP <= 0) {
            console.log("Destroying Enemy");
            Player.pcsprite.x += 16;
            Enemy.sprite.destroy();
            game.time.events.removeAll(combatEvent);
            InCombat.InCombat = false;
        }
        if (Player.CursesActive) {
            console.log("Cursed the enemy! Insta-kill!");
            Enemy.sprite.destroy();
            game.time.events.removeAll(combatEvent);
            Player.pcsprite.x += 16;
            InCombat.InCombat = false;
            Player.CursesActive = false;
            Delay.Delay = -1000;
            new CombatTextGen(game, Enemy.sprite.x + 32, Enemy.sprite.y, "Cursed! Insta-kill!", "", Turn, textEvents, Delay);

        }
    }
    if (InCombat.InCombat){
        if (Turn.Turn === true) {
            if (Player.PCCURHP > 0 || Enemy.HP > 0) {
                console.log("Player's turn to attack!");
                PlayerAttack(game, Player, Enemy, Turn, PassiveEffects, Burn, combatEvent, textEvents, Delay);
            }
        }
        else {
            if (Player.PCCURHP > 0 || Enemy.HP > 0) {
                console.log("Enemy's turn to attack!");
                EnemyAttack(game, Player, Enemy, Turn, PassiveEffects, Burn, combatEvent, textEvents, Delay);
            }
        }
    }
}

/**
 * Attackers heal for a percentage of the damage they're about to deal and then deal their damage as well as apply Burn
 * @param game
 * @param P
 * @param A
 * @param D
 * @param AATK
 * @param DDEF
 * @param Burn
 * @param Turn
 * @param combatEvents
 * @param textEvents
 * @param Delay
 * @constructor
 */
function DealDamage(game, P, A, D, AATK, DDEF, Burn, Turn, combatEvents, textEvents, Delay){
    var ActualDamage;
    ActualDamage = P.Parry * (P.Critical * (AATK - DDEF));
    console.log("The actual damage is " + ActualDamage);
    console.log("Player Burn is " + Burn.PBurn);
    console.log("Enemy Burn is " + Burn.EBurn);
    console.log("The Turn when trying damage is " + Turn.Turn);
    console.log(textEvents);

    if (Turn.Turn) {
        A.PCCURHP += ((ActualDamage / 100) * P.Lifesteal);
        if (P.Lifesteal > 0 ) {
            new CombatTextGen(game, A.pcsprite.x, A.pcsprite.y, "Healed for ", (ActualDamage / 100) * P.Lifesteal, Turn, textEvents, Delay);
        }
        D.HP -= ActualDamage;
        new CombatTextGen(game, D.sprite.x + 32, D.sprite.y, "", ActualDamage, Turn, textEvents, Delay);
        D.HP -= Burn.PBurn;
    }
    else{
        A.HP += ((ActualDamage / 100) * P.Lifesteal);
        if (P.Lifesteal > 0 ) {
            new CombatTextGen(game, A.sprite.x, A.sprite.y, "Healed for ", (ActualDamage / 100) * P.Lifesteal, Turn, textEvents, Delay);
        }
        D.PCCURHP -= ActualDamage;
        new CombatTextGen(game, D.pcsprite.x, D.pcsprite.y, "", ActualDamage, Turn, textEvents, Delay);
        D.PCCURHP -= Burn.EBurn;
    }
}

/**
 * Player Attack Function, if passives are present uses ApplyPassive, otherwise goes to the DealDamage function
 * @param game
 * @param Player
 * @param Enemy
 * @param Turn
 * @param PassiveEffects
 * @param Burn
 * @param combatEvents
 * @param textEvents
 * @param Delay
 * @constructor
 */
function PlayerAttack(game, Player, Enemy, Turn, PassiveEffects, Burn, combatEvents, textEvents, Delay) {
    console.log("The turn is " + Turn.Turn);
    console.log("The enemy Passive length is " + Enemy.Passives.length + " and the player passive length is " + Player.PCPassive.length);
    console.log(textEvents);
    for (var i = 0; i < Player.PCPassive.length || i < Enemy.Passives.length; i++) {
        ApplyPassive(game, Player, Enemy, Player.PCPassive[i], Enemy.Passives[i], PassiveEffects, Burn, Turn, Delay);
    }
    DealDamage(game, PassiveEffects, Player, Enemy, Player.PCPATK, Enemy.PDEF, Burn, Turn, combatEvents, textEvents, Delay);
    console.log("Now Enemy HP is " + Enemy.HP);
    Turn.Turn = false;
}

/**
 *Enemy Attack Function, if passives are present uses ApplyPassive, otherwise goes to the DealDamage function
 * @param game
 * @param Player
 * @param Enemy
 * @param Turn
 * @param PassiveEffects
 * @param Burn
 * @param combatEvents
 * @param textEvents
 * @param Delay
 * @constructor
 */
function EnemyAttack(game, Player, Enemy, Turn, PassiveEffects, Burn, combatEvents, textEvents, Delay) {
    console.log("The turn is " + Turn.Turn);console.log("Player HP was at " + Player.PCCURHP);
    console.log("The enemy Passive length is " + Enemy.Passives.length + " and the player passive length is " + Player.PCPassive.length);
    console.log(textEvents);
    for (var i = 0; i < Enemy.Passives.length || i < Player.PCPassive.length; i++) {
        ApplyPassive(game, Player, Enemy, Player.PCPassive[i], Enemy.Passives[i], PassiveEffects, Burn, Turn, textEvents, Delay);
    }
    DealDamage(game, PassiveEffects, Enemy, Player, Enemy.PATK, Player.PCPDEF, Burn, Turn, combatEvents, textEvents, Delay);
    console.log("Now Player HP is " + Player.PCCURHP);
    Turn.Turn = true;
}

/**
 * Checks passives and activates them automatically in the case of Burn and Lifesteal and checks RNG to see if Critical and Parry activate
 * @param game
 * @param PC
 * @param Enemy
 * @param PPassive
 * @param EPassive
 * @param PassiveEffects
 * @param Burn
 * @param Turn
 * @param textEvents
 * @param Delay
 * @constructor
 */
function ApplyPassive(game, PC, Enemy, PPassive, EPassive, PassiveEffects, Burn, Turn, textEvents, Delay) {
    /*When it's the player's turn*/
     if (typeof PPassive === "undefined"){
         console.log("No passive in this player slot.");
         PPassive = {
             ID: "GETRIDOFME",
             Passive: "N/A",
             PassiveX: "N/A"
         };
     }
     if (typeof EPassive === "undefined") {
         console.log("No passive in this enemy slot.");
         EPassive = {
             ID: "GETRIDOFME",
             Passive: "N/A",
             PassiveX: "N/A"
         };
     }
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
            new CombatTextGen(game, Enemy.sprite.x, Enemy.sprite.y, "Critical Hit!", "", Turn, textEvents, Delay);
            PassiveEffects.Critical = 2;
        }
        else {
            console.log("Critical Failed");
        }
    }
    else if (PPassive.Passive === "Burn") {
        Burn.PBurn += PPassive.PassiveX;
        new CombatTextGen(game, Enemy.sprite.x, Enemy.sprite.y, "Burning for ", Burn.PBurn, Turn, textEvents, Delay);
        console.log("Player's Burn Applied! Currently " + Burn.PBurn)
    }
    /**Passives belonging to the enemy that activate when the player is attacking*/
    else if (EPassive.Passive === "Parry") {
        console.log("Getting attacked, attempting Enemy's Parry");
        if (RNG < EPassive.PassiveX) {
            console.log("Activating Enemy's Parry");
            new CombatTextGen(game, PC.pcsprite.x, PC.pcsprite.y, "Parried!", "", Turn, textEvents, Delay);
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
                new CombatTextGen(game, PC.pcsprite.x, PC.pcsprite.y, "Critical Hit!", "", Turn, textEvents, Delay);
            }
            else {
                console.log("Enemy's Critical Failed");
            }

        }
        else if (EPassive.Passive === "Burn") {
            Burn.EBurn += EPassive.PassiveX;
            new CombatTextGen(game, PC.pcsprite.x, PC.pcsprite.y, "Burning for ", Burn.EBurn, Turn, textEvents, Delay);
            console.log("Enemy's Burn Applied! Currently " + Burn.EBurn)
        }
        else if (PPassive.Passive === "Parry") {
            console.log("Getting attacked, attempting Player's  Parry");
            if (RNG < PPassive.PassiveX) {
                console.log("Activating Players's Parry");
                new CombatTextGen(game, Enemy.sprite.x, Enemy.sprite.y, "Parried!", "", Turn, textEvents, Delay);
                PassiveEffects.Parry = 0;
            }
            else {
                console.log("Player's Parry Failed");
            }
        }
    }
}