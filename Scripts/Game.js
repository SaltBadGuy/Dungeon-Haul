/**
 * Created by Callum on 26/04/2017.
 */
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

//Used for keyboard controls
var keyUp;
var keyDown;
var keyLeft;
var keyRight;
var keyJ;
var keyK;
var keyL;
var keyM;
var keyZ;
var keyX;
var keyC;

var FloorArr = [];

var GridArr = [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [9, 10],
    [11, 12],
    [13, 14],
    [15, 16],
    [17, 18],
    [19, 20],
    [21, 22],
    [23, 24],
    [25, 26],
    [27, 28],
    [29, 30],
    [31, 32],
    [33, 34],
    [35, 36],
    [37, 38]
];

//Player character and its stats
var PC = {};

var CurrentFloor = 0;
var StairObject = {};

//IDs, used to keep track of instances of objects
var EquipID = 0;
var EnemyID = 0;
var ChestID = 0;
var PlayerID = 0;

/*Arrays for storing enemies and chests*/
var InCombat;

var cfs = {
    CurrentFloorNum: 0,
    width: 0,
    height: 0,
    scalenum: 0,
    cellsize: 0,
    gridwidth: 0,
    gridheight: 0,
    gridwidthgap: 0,
    gridheightgap: 0,
    GridArr: [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
        [9, 10],
        [11, 12],
        [13, 14],
        [15, 16],
        [17, 18],
        [19, 20],
        [21, 22],
        [23, 24],
        [25, 26],
        [27, 28],
        [29, 30],
        [31, 32],
        [33, 34],
        [35, 36],
        [37, 38]
    ],
    EnemyArr: [{}],
    ChestArr: [{}],
    PC: {},
    StairObject: 0,
    EnemyID: 0,
    ChestID: 0,
    EquipID: 0
};

var PCHeadEquip;
var PCChestEquip;
var PCWeaponEquip;

var Turn;
var timerEvents = [];
var textEvents = [];

var Element1 = "aaa";
var Element2 = "bbb";


/**Hud Variables**/
var HudText;
var hints = [];
var HintsEvents = [];
var HintToDisplay;

/**Floor Generation Return**/
var CurrentFloorStuff;
var FloorStuff;

BasicGame.Game.prototype = {


create: function () {

        //Plugin initialization

        //Physics system, used for player movement, collision detection and is planned to be used for particles

    console.log(cfs);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    /**
     * InCombat object, needs to be an object because it needs to be changed in functions it's passed to
     */

        InCombat = {
            InCombat: false
        };

        var canvaswidth = this.game.canvas.width;
        var canvasheight = this.game.canvas.height;

        console.log(cfs);
        cfs.width = 17;
        cfs.height = 17;
        cfs.scalenum = 2;
        cfs.EnemyID = 0;
        cfs.ChestID = 0;
        cfs.EquipID = 0;
        cfs.cellsize = 16 * cfs.scalenum;
        cfs.gridwidth = cfs.cellsize * (cfs.width + 1);
        cfs.gridheight = cfs.cellsize * (cfs.height + 1);
        cfs.gridwidthgap = canvaswidth - cfs.gridwidth;
        cfs.gridheightgap = canvasheight - cfs.gridheight;

        scalenum = cfs.scalenum;

        console.log(cfs);

        /*
        cfs.width = 17;
        cfs.height = 17;
        cfs.scalenum = 2;
        cfs.cellsize = 16 * cfs.scalenum;
        cfs.gridwidth = cfs.cellsize * (cfs.width + 1);
        cfs.gridheight = cfs.cellsize * (cfs.height + 1);
        cfs.gridwidthgap = this.game.canvas.width - cfs.gridwidth;
        cfs.gridheightgap = this.game.canvas.height - cfs.gridheight;
        */

        new PlayGen(this.game, cfs);

        console.log(cfs.PC);

        var DHHud = this.game.add.tileSprite(0, 0, 224, 576, 'DHHUD');

        DHHud.tint = 0x474546;

        for (var i = 0; i < cfs.EnemyArr.length; i++){
            console.log(cfs.EnemyArr[i]);
        }

        var HintsFile = this.game.cache.getText('Hints');

        hints = HintsFile.split('\n');
        console.log(hints);

        HintDisplay();

        HintsEvents.push(this.game.time.events.loop(10000, function () {
            HintDisplay()
        }, this));

        Turn = true;

        var combatTimer = this.game.time.create(true);
        var combatTextTimer = this.game.time.create(true);

        //Creates a PCHeadEquip (A helmet)
        PCHeadEquip = new PCEquipProto;

        //Creates a PCChestEquip (A chestplate)
        PCChestEquip = new PCEquipProto;

        //Creates a PCWeaponEquip (A weapon)
        PCWeaponEquip = new PCEquipProto;

        this.game.stage.backgroundColor = '#000000';

        //TODO: ENEMY STAT SCREEN

        //Enable physics for the player, this is what is used to let him move and gain a hitbox for collision detection

        //game.physics.arcade.enable(PC);
        for (var i = 0; i < cfs.EnemyArr.length; i++){
            this.game.physics.arcade.enable(cfs.EnemyArr[i]);
        }

        console.log(cfs);

        HudText = new HudInitialize(this, cfs, Element1, Element2);

        //Capture input for controlling player.
        //NOTE: This captures the initial press of the key. This is intended as the movement is grid-based and this prevents players from accidentally moving more squares than they need to.
        keyUp = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        keyUp.onDown.add(function(){
            PCMoveUp(cfs.PC, this.game, cfs.GridArr, InCombat);
        }, this);

        keyDown = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        keyDown.onDown.add(function(){
            PCMoveDown(cfs.PC, this.game, cfs.GridArr, InCombat);
        }, this);

        keyLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        keyLeft.onDown.add(function(){
            PCMoveLeft(cfs.PC, this.game, cfs.GridArr, InCombat);
        }, this);

        keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        keyRight.onDown.add(function(){
            PCMoveRight(cfs.PC, this.game, cfs.GridArr, InCombat);
        }, this);

        /*
         //Capture input for debug purposes
         //Equipping test helmet
         keyJ = game.input.keyboard.addKey(Phaser.Keyboard.J);
         keyJ.onDown.add(function(){
         EquipTestHelmet(game, PC, EquipID);
         }, this);

         //Equipping test helmet
         keyK = game.input.keyboard.addKey(Phaser.Keyboard.K);
         keyK.onDown.add(function() {
         EquipTestChestPlate(game, PC, EquipID);
         }, this);

         //Equipping test helmet
         keyL = game.input.keyboard.addKey(Phaser.Keyboard.L);
         keyL.onDown.add(function() {
         EquipTestWeapon(game, PC, EquipID);
         }, this);

         //Deal damage to player
         keyM = game.input.keyboard.addKey(Phaser.Keyboard.M);
         keyM.onDown.add(HurtPlayer, this);
         */

        //Activate Potion
        keyZ = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        keyZ.onDown.add(function() {
            ActivatePotion(cfs.PC, InCombat);
        }, this);

        //Activate Pick
        keyX = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        keyX.onDown.add(function(){
            ActivatePick(cfs.PC, InCombat);
        }, this);

        //Activate Curse
        keyC = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
        keyC.onDown.add(function(){
            ActivateCurse(cfs.PC, InCombat);
        }, this);
        keySpace = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACE);


        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.W);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.S);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.A);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);
        this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.J);

        console.log(cfs.PC);

        cfs.PC.PCHeadEquip = new PCEquipProto(this, 0, "Helmet", 1, false, 0, "N/A");
        cfs.PC.PCChestEquip = new PCEquipProto(this, 0, "ChestArmour", 1, false, 0, "N/A");
        cfs.PC.PCWeaponEquip = new PCEquipProto(this, 0, "Weapon", 1, false, 0, "N/A");

        for (var i = 0; i < cfs.EnemyArr.length; i++){
            console.log(cfs.EnemyArr[i]);
            this.game.physics.enable(cfs.EnemyArr[i].sprite, Phaser.Physics.ARCADE);
            cfs.EnemyArr[i].sprite.inputEnabled = true;
        }


        console.log(cfs);
        console.log(cfs.PC);
        console.log(cfs.ChestArr);
        console.log(cfs.EnemyArr);

    },


    //
    //
    //UPDATE
    //
    //

    update: function () {

        for (i = 0; i < cfs.EnemyArr.length; i++) {
            if (cfs.EnemyArr[i].sprite.input.pointerOver()) {
                var Title;
                if (cfs.EnemyArr[i].Quality === 1){
                    Title = "Common ";
                }
                else if (cfs.EnemyArr[i].Quality === 1.5){
                    Title = "Magical ";
                }
                else if (cfs.EnemyArr[i].Quality === 2){
                    Title = "Epic ";
                }
                else if (cfs.EnemyArr[i].Quality === 3){
                    Title = "Mythical ";
                }
                HudText.TextElement1.setText(Title + "Enemy");
                if (cfs.EnemyArr[i].Passives.length > 0){
                    EnemyPassivesString = "and ";
                    PassiveStringConcat = "";
                    for (j = 0; j < cfs.EnemyArr[i].Passives.length; j++){
                        PassiveStringConcat = PassiveStringConcat.concat(" and " + cfs.EnemyArr[i].Passives[j].Passive + " " + cfs.EnemyArr[i].Passives[j].PassiveX + "%");
                        EnemyPassivesString = PassiveStringConcat;
                    }
                }
                else{
                    EnemyPassivesString = "";
                }
                HudText.TextElement2.setText("This enemy's HP is " + Math.round(cfs.EnemyArr[i].HP) + " with a ATK of " + Math.round(cfs.EnemyArr[i].PATK) + " and a DEF of " + Math.round(cfs.EnemyArr[i].PDEF) + EnemyPassivesString);
                HudText.TextElement1.alpha = 1;
                HudText.TextElement2.alpha = 1;
            }
            else
            {
                //bunny.alpha = 0.5;
            }
            this.game.physics.arcade.collide(cfs.PC.pcsprite, cfs.EnemyArr[i].sprite, function () {
                ColliderEnemy(this.game, timerEvents, textEvents, cfs.PC, cfs.EnemyArr[i], InCombat, Turn)
            }, null, this);
        }

        for (var i = 0; i < cfs.ChestArr.length; i++) {
            if (cfs.ChestArr[i].Looted === false) {
                if (cfs.ChestArr[i].chestsprite.input.pointerOver()) {
                    HudText.TextElement1.setText("Chest");
                    HudText.TextElement2.setText("This can contain a potion, a pick, a curse or equipment.");
                    HudText.TextElement1.alpha = 1;
                    HudText.TextElement2.alpha = 1;
                }
                if (!InCombat.InCombat) {
                    this.game.physics.arcade.collide(cfs.PC.pcsprite, cfs.ChestArr[i].chestsprite, function () {
                        new CheckChest(this.game, cfs, cfs.ChestArr[i], HudText, textEvents)
                    }, null, this);
                }
            }
            else{
                cfs.ChestArr[i].chestsprite.destroy();
            }
        }

        if(cfs.StairObject.StairSprite.input.pointerOver()) {
            HudText.TextElement1.setText("Staircase");
            HudText.TextElement2.setText("This leads you to the next floor");
            HudText.TextElement1.alpha = 1;
            HudText.TextElement2.alpha = 1;
        }

        if (!InCombat.InCombat) {
            this.game.physics.arcade.collide(cfs.PC.pcsprite, cfs.StairObject.StairSprite, function () {
                ColliderStairs(this.game, cfs, HudText, textEvents)
            }, null, this);
        }

        if (!(typeof cfs.StairObject.StairSprite === "undefined")) {
            this.game.world.bringToTop(cfs.StairObject.StairSprite);
        }

        if (!(typeof cfs.PC === "undefined")) {
            this.game.world.bringToTop(cfs.PC.pcsprite);
            if(cfs.PC.pcsprite.input.pointerOver()) {
                HudText.TextElement1.setText("Player");
                HudText.TextElement2.setText("This is you! Survive as many floors as possible!");
                HudText.TextElement1.alpha = 1;
                HudText.TextElement2.alpha = 1;
            }
        }

        //Save the MAXHP at the start of the step before any changes are made
        if (!(typeof cfs.PC === "undefined")) {
            PrevMAXHP = cfs.PC.PCMAXHP;

            //Updates all stats
            cfs.PC.PCSTR = cfs.PC.BasePCSTR + cfs.PC.PCHeadEquip.PCSTRStat + cfs.PC.PCChestEquip.PCSTRStat + cfs.PC.PCWeaponEquip.PCSTRStat;

            //Refers to the player's physical attack. Is increased by Strength in the current prototype and has a base value of 20.
            cfs.PC.PCPATK = Math.floor(20 + (0.2 * cfs.PC.PCSTR));
            cfs.PC.PCPDEF = Math.floor(5 + (0.1 * cfs.PC.PCSTR));

            cfs.PC.PCMAXHP = Math.floor(cfs.PC.BaseMaxHP + (0.5 * cfs.PC.PCSTR));

            //If the player's current HP exceeds the max HP, cut it down to the max HP
            if (cfs.PC.PCCURHP > cfs.PC.PCMAXHP) {
                console.log("Max HP exceeded, cutting down current HP");
                cfs.PC.PCCURHP = cfs.PC.PCMAXHP;
            }

            //Check if the MAXHP has changed during this step and if the player was at full health before update the CURHP to match the new MAXHP
            if (cfs.PC.PCMAXHP !== PrevMAXHP) {
                if (cfs.PC.PCCURHP === PrevMAXHP) {
                    cfs.PC.PCCURHP = cfs.PC.PCMAXHP;
                    console.log("Player was at full health before, matching their hp to their new maximum");
                }
            }

            Math.round(cfs.PC.PCCURHP);

            new UpdateHudElements(this.game, HudText, cfs.PC, cfs.EnemyArr[0], cfs.CurrentFloorNum, HintToDisplay);
        }

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.game.state.start('MainMenu');

    },
/*
    render: function(){

         if(!(typeof PC === "undefined")) {
                game.debug.body(PC.pcsprite);
            }
         game.debug.body(EnemyArr);
         for (var i = 0; i < ChestArr.length; i++) {
                game.debug.body(ChestArr[i].chestsprite);
            }
         for (var j = 0; j < EnemyArr.length; j++) {
                game.debug.body(EnemyArr[j].sprite);
            }
         if(!(typeof StairObject === "undefined")) {
                game.debug.body(StairObject.StairSprite);
            }

    }*/
};
