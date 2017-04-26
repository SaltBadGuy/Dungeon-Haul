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

var EnemyArr = [];
var ChestArr = [];

var InCombat;

var PCHeadEquip;
var PCChestEquip;
var PCWeaponEquip;

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

var Turn;
var timerEvents = [];
var textEvents = [];

var Element1 = "aaa";
var Element2 = "bbb";

/**Floor Generation Stats*/

var width;
var height;
var scalenum;
var cellsize;
var gridwidth;
var gridheight;
var gridwidthgap;
var gridheightgap;

/**Hud Variables**/
var HudText;
var hints = [];
var HintsEvents = [];
var HintToDisplay;

/**Floor Generation Return**/
var FloorStuff;

BasicGame.Game.prototype = {

    preload: function () {
        //Sprites
            // Player character sprite
        game.load.image('DHPC', 'Assets/DHPC.png');
        //Floor tile sprite
        game.load.image('DHFloor', 'Assets/DHFloor.png');
        //Wall tile sprite
        game.load.image('DHWall', 'Assets/DHStoneWall1.png');
        //Bedrock tile sprite
        game.load.image('DHBedrock', 'Assets/DHBedrock.png');
        //Chest Sprite
        game.load.image('DHChest', 'Assets/DHChest.png');
        //Enemy 0 Sprite
        game.load.image('DH0', 'Assets/DHZombie.png');
        //Enemy 1 Sprite
        game.load.image('DH1', 'Assets/DHSkeleton.png');
        //Enemy 2 Sprite
        game.load.image('DH2', 'Assets/DHDemon.png');
        //Staircase sprite
        game.load.image('DHStairs', 'Assets/DHStairs.png');
        //HUD sprite
        game.load.image('DHHUD', 'Assets/DHHUD.png');
        //Text file with hints
        game.load.text('Hints', 'Assets/Hints.txt');
},

    create: function () {

        //Plugin initialization

        //Physics system, used for player movement, collision detection and is planned to be used for particles

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //InCombat object, needs to be an object because it needs to be changed in functions it's passed to
        InCombat = {
            InCombat: false
        };

        EnemyArr = [];

        width = 17;
        height = 17;
        scalenum = 2;
        cellsize = 16 * scalenum;
        gridwidth = cellsize * (width + 1);
        gridheight = cellsize * (height + 1);
        gridwidthgap = game.canvas.width - gridwidth;
        gridheightgap = game.canvas.height - gridheight;

        FloorStuff = new PlayGen(game, height, width, cellsize, gridwidth, gridheight, gridwidthgap, gridheightgap, GridArr, EnemyArr, ChestArr, scalenum, PC, StairObject, EnemyID, ChestID, EquipID, CurrentFloor);

        GridArr = FloorStuff.GridArr;
        PC = FloorStuff.PC;
        StairObject = FloorStuff.StairObject;
        CurrentFloor = FloorStuff.CurrentFloor;

        var DHHud = game.add.tileSprite(0, 0, 224, 576, 'DHHUD');

        DHHud.tint = 0x474546;

        for (var i = 0; i < EnemyArr.length; i++){
            console.log(EnemyArr[i]);
        }

        var HintsFile = game.cache.getText('Hints');

        hints = HintsFile.split('\n');
        console.log(hints);

        HintDisplay();

        HintsEvents.push(game.time.events.loop(10000, function () {
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

        game.stage.backgroundColor = '#000000';

        //TODO: ENEMY STAT SCREEN

        //Enable physics for the player, this is what is used to let him move and gain a hitbox for collision detection

        //game.physics.arcade.enable(PC);
        for (var i = 0; i < EnemyArr.length; i++){
            game.physics.arcade.enable(EnemyArr[i]);
        }

        HudText = new HudInitialize(game, PC, gridwidthgap, gridheightgap, EnemyArr, CurrentFloor, Element1, Element2);

        //Capture input for controlling player.
        //NOTE: This captures the initial press of the key. This is intended as the movement is grid-based and this prevents players from accidentally moving more squares than they need to.
        keyUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
        keyUp.onDown.add(function(){
            PCMoveUp(PC, game, GridArr, InCombat);
        }, this);

        keyDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
        keyDown.onDown.add(function(){
            PCMoveDown(PC, game, GridArr, InCombat);
        }, this);

        keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
        keyLeft.onDown.add(function(){
            PCMoveLeft(PC, game, GridArr, InCombat);
        }, this);

        keyRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
        keyRight.onDown.add(function(){
            PCMoveRight(PC, game, GridArr, InCombat);
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
        keyZ = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        keyZ.onDown.add(function() {
            ActivatePotion(PC, InCombat);
        }, this);

        //Activate Pick
        keyX = game.input.keyboard.addKey(Phaser.Keyboard.X);
        keyX.onDown.add(function(){
            ActivatePick(PC, InCombat);
        }, this);

        //Activate Curse
        keyC = game.input.keyboard.addKey(Phaser.Keyboard.C);
        keyC.onDown.add(function(){
            ActivateCurse(PC, InCombat);
        }, this);
        keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACE);


        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.W);
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.S);
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.A);
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.D);
        game.input.keyboard.removeKeyCapture(Phaser.Keyboard.J);

        PC.PCHeadEquip = new PCEquipProto(game, 0, "Helmet", 1, false, 0, "N/A");
        PC.PCChestEquip = new PCEquipProto(game, 0, "ChestArmour", 1, false, 0, "N/A");
        PC.PCWeaponEquip = new PCEquipProto(game, 0, "Weapon", 1, false, 0, "N/A");

        //text = game.add.text(700, 30, 'Time: 0', { font: "32px alphabeta", fill: "#ffffff", align: "center" });
        //.anchor.setTo(0.5, 0.5);

        for (var i = 0; i < EnemyArr.length; i++){
            console.log(EnemyArr[i]);
            game.physics.enable(EnemyArr[i].enemysprite, Phaser.Physics.ARCADE);
            EnemyArr[i].enemysprite.inputEnabled = true;
        }

        console.log(PC);
        console.log(ChestArr);

    },

    update: function () {

        for (i = 0; i < EnemyArr.length; i++) {
            if (EnemyArr[i].enemysprite.input.pointerOver()) {
                var Title;
                if (EnemyArr[i].Quality === 1){
                    Title = "Common ";
                }
                else if (EnemyArr[i].Quality === 1.5){
                    Title = "Magical ";
                }
                else if (EnemyArr[i].Quality === 2){
                    Title = "Epic ";
                }
                else if (EnemyArr[i].Quality === 3){
                    Title = "Mythical ";
                }
                HudText.TextElement1.setText(Title + "Enemy");
                if (EnemyArr[i].ENPassive.length > 0){
                    EnemyPassivesString = "and ";
                    PassiveStringConcat = "";
                    for (j = 0; j < EnemyArr[i].ENPassive.length; j++){
                        PassiveStringConcat = PassiveStringConcat.concat(" and " + EnemyArr[i].ENPassive[j].Passive + " " + EnemyArr[i].ENPassive[j].PassiveX + "%");
                        EnemyPassivesString = PassiveStringConcat;
                    }
                }
                else{
                    EnemyPassivesString = "";
                }
                HudText.TextElement2.setText("This enemy's HP is " + Math.round(EnemyArr[i].ENHP) + " with a ATK of " + Math.round(EnemyArr[i].ENPATK) + " and a DEF of " + Math.round(EnemyArr[i].ENPDEF) + EnemyPassivesString);
                HudText.TextElement1.alpha = 1;
                HudText.TextElement2.alpha = 1;
            }
            else
            {
                //bunny.alpha = 0.5;
            }
            game.physics.arcade.collide(PC.pcsprite, EnemyArr[i].enemysprite, function () {
                ColliderEnemy(game, timerEvents, textEvents, PC, EnemyArr[i], InCombat, Turn)
            }, null, this);
        }

        for (var i = 0; i < ChestArr.length; i++) {
            if (ChestArr[i].Looted === false) {
                if (ChestArr[i].chestsprite.input.pointerOver()) {
                    HudText.TextElement1.setText("Chest");
                    HudText.TextElement2.setText("This can contain a potion, a pick, a curse or equipment.");
                    HudText.TextElement1.alpha = 1;
                    HudText.TextElement2.alpha = 1;
                }
                if (!InCombat.InCombat) {
                    game.physics.arcade.collide(PC.pcsprite, ChestArr[i].chestsprite, function () {
                        CheckChest(game, PC, ChestArr[i], HudText, textEvents)
                    }, null, this);
                }
            }
            else{
                ChestArr[i].chestsprite.destroy();
            }
        }

        if(StairObject.StairSprite.input.pointerOver()) {
            HudText.TextElement1.setText("Staircase");
            HudText.TextElement2.setText("This leads you to the next floor");
            HudText.TextElement1.alpha = 1;
            HudText.TextElement2.alpha = 1;
        }

        if (!InCombat.InCombat) {
            game.physics.arcade.collide(PC.pcsprite, StairObject.StairSprite, function () {
                ColliderStairsCall()
            }, null, this);
        }

        if (!(typeof StairObject.StairSprite === "undefined")) {
            game.world.bringToTop(StairObject.StairSprite);
        }

        if (!(typeof PC === "undefined")) {
            game.world.bringToTop(PC.pcsprite);
            if(PC.pcsprite.input.pointerOver()) {
                HudText.TextElement1.setText("Player");
                HudText.TextElement2.setText("This is you! Survive as many floors as possible!");
                HudText.TextElement1.alpha = 1;
                HudText.TextElement2.alpha = 1;
            }
        }

        //Save the MAXHP at the start of the step before any changes are made
        if (!(typeof PC === "undefined")) {
            PrevMAXHP = PC.PCMAXHP;

            //Updates all stats
            PC.PCSTR = PC.BasePCSTR + PC.PCHeadEquip.PCSTRStat + PC.PCChestEquip.PCSTRStat + PC.PCWeaponEquip.PCSTRStat;

            //Refers to the player's physical attack. Is increased by Strength in the current prototype and has a base value of 20.
            PC.PCPATK = Math.floor(20 + (0.2 * PC.PCSTR));
            PC.PCPDEF = Math.floor(5 + (0.1 * PC.PCSTR));

            PC.PCMAXHP = Math.floor(PC.BaseMaxHP + (0.5 * PC.PCSTR));

            //If the player's current HP exceeds the max HP, cut it down to the max HP
            if (PC.PCCURHP > PC.PCMAXHP) {
                console.log("Max HP exceeded, cutting down current HP");
                PC.PCCURHP = PC.PCMAXHP;
            }

            //Check if the MAXHP has changed during this step and if the player was at full health before update the CURHP to match the new MAXHP
            if (PC.PCMAXHP !== PrevMAXHP) {
                if (PC.PCCURHP === PrevMAXHP) {
                    PC.PCCURHP = PC.PCMAXHP;
                    console.log("Player was at full health before, matching their hp to their new maximum");
                }
            }

            Math.round(PC.PCCURHP);

            UpdateHudElements(game, HudText, PC, EnemyArr[0], CurrentFloor, HintToDisplay);
        }

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },

    render: function(){
        /**
         if(!(typeof PC === "undefined")) {
                game.debug.body(PC.pcsprite);
            }
         game.debug.body(EnemyArr);
         for (var i = 0; i < ChestArr.length; i++) {
                game.debug.body(ChestArr[i].chestsprite);
            }
         for (var j = 0; j < EnemyArr.length; j++) {
                game.debug.body(EnemyArr[j].enemysprite);
            }
         if(!(typeof StairObject === "undefined")) {
                game.debug.body(StairObject.StairSprite);
            }
         */
    }
};