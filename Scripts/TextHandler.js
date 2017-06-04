/**
 * Created by Callum on 03/06/2017.
 */

/**
 * Used by the combat step to generate strings to be displayed as combat text
 * @param game
 * @param x
 * @param y
 * @param message
 * @param number
 * @param Turn
 * @param textEvents
 * @param Delay
 * @constructor
 */
function CombatTextGen(game, x, y, message, number, Turn, textEvents, Delay){
    console.log(Delay.Delay);
    Delay.Delay += 200;
    console.log(Delay.Delay);
    textEvents.push(game.time.events.add(Delay.Delay, function (){
        new GenerateText(game, x, y, message, number, Turn, textEvents, Delay)},game
    ));

}


/**
 * Generates a temporary text that floats upwards or downwards, often showing the damage of the attack or showing that a passive is active. Has a known bug with text not clearing sometimes.
 * @param game
 * @param x
 * @param y
 * @param message
 * @param number
 * @param Turn
 * @param textEvents
 * @param Delay
 * @constructor
 */
function GenerateText(game, x, y, message, number, Turn, textEvents, Delay){
    var combatTextFont = "25px Alphabeta";
    if (Turn.Turn){
        var Color = "#3cd100";
    }
    else{
        Color = "#d1000c";
    }
    var value;
    if (isNaN(number)){
        value = "";
    }
    else{
        Math.round(number);
    }

    var BaseDelay = 1000;
    var combatText = game.add.text(x, y - 32, message + number, {font: combatTextFont, fill: Color, stroke: "#ffffff", strokeThickness: 2});
    combatText.anchor.setTo(0.5, 0);
    combatText.align = 'center';
    console.log(textEvents);
    if (y < 288) {
        game.add.tween(combatText).to({y: y + 300}, 1500, Phaser.Easing.Linear.none, true);
    }
    else{
        game.add.tween(combatText).to({y: y - 300}, 1500, Phaser.Easing.Linear.none, true);
    }
    textEvents.push(game.time.events.add(1000, function (){
        DestroyText(combatText)
    }, game));
}

/**
 * Simple destroy text function, currently doesn't seem to work on the last text generated during combat
 * @param TargetText
 * @constructor
 */
function DestroyText(TargetText){
    console.log("Destroying Text");
    TargetText.destroy();
}