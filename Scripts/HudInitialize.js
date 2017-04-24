/**
 * Created by Callum on 05/03/2017.
 */

/**
 * Creates the HUD for the game.
 * @param game
 * @param PC
 * @param gridwidthgap
 * @param gridheightgap
 * @param EnemyArr
 * @param CurrentFloor
 * @param Element1
 * @param Element2
 * @constructor
 */
function HudInitialize(game, PC, gridwidthgap, gridheightgap, EnemyArr, CurrentFloor, Element1, Element2) {
    console.log(game);
    console.log(PC);
    var HUDWidth = gridwidthgap;
    var HUDHeight = gridheightgap;
    this.PCHPText = game.add.text((gridwidthgap/2), 30, "HP = " + Math.round(PC.PCCURHP) + "/" + PC.PCMAXHP + ".", {
        font: "24px alphabeta",
        fill: "#6e0a00",
        align: "center",
        stroke: '#ffffff',
        strokeThickness: 2
    });
    this.PCHPText.anchor.setTo(0.5, 0.5);
    //Displays the player's strength
    this.PCSTRText = game.add.text((gridwidthgap/2), 60, "STR = " + Math.round(PC.PCSTR) + ".", {
        font: "24px alphabeta",
        fill: "#ff0019",
        align: "center",
        stroke: '#f8edff',
        strokeThickness: 2
    });
    this.PCSTRText.anchor.setTo(0.5, 0.5);

    //Displays the player's physical attack
    this.PCPATKText = game.add.text((gridwidthgap/2), 90, "ATK = " + Math.round(PC.PCPATK) + ".", {
        font: "24px alphabeta",
        fill: "#ff0019",
        align: "center",
        stroke: '#fff8f9',
        strokeThickness: 2
    });
    this.PCPATKText.anchor.setTo(0.5, 0.5);
    //Displays the player's physical defence
    this.PCPDEFText = game.add.text((gridwidthgap/2), 120, "DEF = " + Math.round(PC.PCPDEF) + ".", {
        font: "24px alphabeta",
        fill: "#ff0019",
        align: "center",
        stroke: '#fff8f9',
        strokeThickness: 2
    });
    this.PCPDEFText.anchor.setTo(0.5, 0.5);
    this.PCHPText.anchor.setTo(0.5, 0.5);
    this.PCPotsText = game.add.text((gridwidthgap/3), 150, "Potions: " + PC.PCPots, {
        font: "18px alphabeta",
        fill: "#00c116",
        align: "center"
    });
    this.PCPotsText.anchor.setTo(0.5, 0.5);

    this.PCPicksText = game.add.text((gridwidthgap/3) * 2, 150, "Picks: " + PC.PCPicks, {
        font: "18px alphabeta",
        fill: "#00c116",
        align: "center"
    });
    this.PCPicksText.anchor.setTo(0.5, 0.5);

    this.PCCursesText = game.add.text((gridwidthgap/2), 180, "Curses: " + PC.PCCurses, {
        font: "18px alphabeta",
        fill: "#00c116",
        align: "center"
    });
    this.PCCursesText.anchor.setTo(0.5, 0.5);

    this.PCPickActive = game.add.text((gridwidthgap/3), 200, "Pick Active!", {
        font: "12px alphabeta",
        fill: "#B8CCAE",
        align: "center",
        wordWrapWidth: gridwidthgap,
        wordWrap: true,
        alpha: 1
    });
    this.PCPickActive.anchor.setTo(0.5, 0.5);

    this.PCCurseActive = game.add.text((gridwidthgap/3) * 2, 200, "Curse Active!", {
        font: "12px alphabeta",
        fill: "#B8CCAE",
        align: "center",
        wordWrapWidth: gridwidthgap,
        wordWrap: true,
        alpha: 1
    });
    this.PCCurseActive.anchor.setTo(0.5, 0.5);



    //Displays the stats of the player's head equipment (if any). Defaults to not wearing anything
    this.PCHeadEquipText = game.add.text((gridwidthgap/2), 225, "You have no helmet equipped.", {
        font: "12px alphabeta",
        fill: "#b8ccae",
        align: "center",
        wordWrapWidth: gridwidthgap,
        wordWrap: true
    });
    this.PCHeadEquipText.anchor.setTo(0.5, 0.5);


    //Displays the stats of the player's chest equipment (if any). Defaults to not wearing anything
    this.PCChestEquipText = game.add.text((gridwidthgap/2), 275, "You have no chestplate equipped.", {
        font: "12px alphabeta",
        fill: "#B8CCAE",
        align: "center",
        wordWrapWidth: gridwidthgap,
        wordWrap: true
    });
    this.PCChestEquipText.anchor.setTo(0.5, 0.5);

    //Displays the stats of the player's weapon equipment (if any). Defaults to not wearing anything
    this.PCWeaponEquipText = game.add.text((gridwidthgap/2), 325, "You have no weapon equipped.", {
        font: "12px alphabeta",
        fill: "#B8CCAE",
        align: "center",
        wordWrapWidth: gridwidthgap,
        wordWrap: true
    });
    this.PCWeaponEquipText.anchor.setTo(0.5, 0.5);


    this.FloorNo = game.add.text((gridwidthgap/2), 500, "Floor " + CurrentFloor, {
        font: "36px alphabeta",
        fill: "#0052cc",
        align: "center",
        stroke: '#f8edff',
        strokeThickness: 2,
        wordWrapWidth: gridwidthgap,
        wordWrap: true
    });
    this.FloorNo.anchor.setTo(0.5, 0.5);

    this.TextElement1 = game.add.text((gridwidthgap/2), 375, "Element 1 is " + Element1, {
        font: "24px alphabeta",
        fill: "#7535ff",
        align: "center",
        stroke: '#f8edff',
        strokeThickness: 2,
        wordWrapWidth: gridwidthgap,
        wordWrap: true
    });
    this.TextElement1.alpha = 0;
    this.TextElement1.anchor.set(0.5, 0.5);
    //this.TextElement1.wordWrap = true;

    this.TextElement2 = game.add.text((gridwidthgap/2), 425, "Element 2 is " + Element2, {
        font: "18px alphabeta",
        fill: "#b400ff",
        align: "center",
        stroke: '#f8edff',
        strokeThickness: 2,
        wordWrapWidth: gridwidthgap,
        wordWrap: true
    });
    this.TextElement2.alpha = 0;
    this.TextElement2.anchor.set(0.5, 0.5);

    //Displays Hints
    this.HintText = game.add.text((800 - gridwidthgap)/2 + gridwidthgap , 24, "HintText", {
        font: "16px alphabeta",
        fill: "#ffffff",
        //align: "center"
        //wordWrapWidth: (800 - gridwidthgap)/2 + gridwidthgap,
        //wordWrap: true
    });
    this.HintText.anchor.setTo(0.5, 0.5);

}