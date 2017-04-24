/**
 * Created by Callum on 24/02/2017.
 */

/**
 *
 * @param game
 * @param xpos
 * @param ypos
 * @param GridX
 * @param GridY
 * @param scalenum
 * @constructor
 */
function PCCharProto(game, GridArr, xpos, ypos, GridX, GridY, scalenum) {
    this.GridX = GridX;
    this.GridY = GridY;

    console.log("GridX is " + GridX);
    console.log("GridY is " + GridY);
    this.pcsprite = game.add.sprite(xpos, ypos, 'DHPC');

    //Refers to the player's maximum health. Is increased by Strength in the current prototype. Can be further increased by items
    this.PCMAXHP = 100;// + (0.5 * PCSTR);
    //Refers to the player's current HP. Starts off the same as Max HP.
    this.PCCURHP = this.PCMAXHP;

    console.log("PCMAXHP at the start of creation is " + this.PCMAXHP);
    //Refers to the player's STR. Is used to increase health attack and armour in this build. Can be further increased by items
    this.BasePCSTR = 30;
    this.PCSTR = this.BasePCSTR;
    //Refers to the player's physical attack. Is increased by Strength in the current prototype and has a base value of 20.
    this.PCPATK = 20 + (0.2 * this.PCSTR);
    this.PCPDEF = 5 + (0.1 * this.PCSTR);

    //Once all stats have been set (mainly STR in this build) recalculate max HP and set current HP to match.
    this.BaseMaxHP = 300;
    this.PCMAXHP = this.BaseMaxHP + (0.5 * this.PCSTR);
    console.log("PCCURHP at the start of creation is " + this.PCCURHP);
    this.PCCURHP = this.PCMAXHP;
    this.PCPassive = [];
    console.debug("PCPassive length is " + this.PCPassive.length);
    this.PCPots = 1;
    this.PCPicks = 1;
    this.PCCurses = 1;
    this.PicksActive = false;
    this.CursesActive = false;
    this.PCHeadEquip = Object;
    this.PCChestEquip = Object;
    this.PCWeaponEquip = Object;
    game.physics.enable(this.pcsprite, Phaser.Physics.ARCADE);
    this.pcsprite.inputEnabled = true;


}

/**
 *
 * @param QualityParam
 * @param GotEquipParam
 * @param PCSTRStatParam
 * @param PassiveParam
 * @constructor
 */
function PCEquipProto(game, IDParam, TypeParam, QualityParam, GotEquipParam, PCSTRStatParam, PassiveParam) {

    this.ID = IDParam;
    this.Type = TypeParam;
    this.Quality = QualityParam;
    this.GotEquip = GotEquipParam;
    this.PCSTRStat = Math.round(PCSTRStatParam);
    this.EquipPassive = PassiveParam;
}
/**
 * Enemy Prototype, is used in EnemyGen
 * @param game
 * @param xpos
 * @param ypos
 * @param IDParam
 * @param QualityParam
 * @param ENSTRStatParam
 * @param PassiveParam
 * @param scalenum
 * @constructor
 */
function EnemyProto(game, xpos, ypos, IDParam, QualityParam, ENSTRStatParam, PassiveParam, scalenum) {
    var RNG = parseInt((Math.random() *  3), 10);
    console.log("When generating enemy sprite, RNG was " + RNG);
    if (RNG === 0) {
        this.enemysprite = game.add.sprite(xpos, ypos, 'DH0');
    }
    else if (RNG === 1){
        this.enemysprite = game.add.sprite(xpos, ypos, 'DH1');
    }
    else if (RNG === 2){
        this.enemysprite = game.add.sprite(xpos, ypos, 'DH2');
    }
    console.log(this.enemysprite);
    this.enemysprite.scale.setTo(scalenum, scalenum);
    this.Quality = QualityParam;
    this.ENSTRStat = ENSTRStatParam;
    this.ENHP = 100 + this.ENSTRStat;
    this.ENPATK = 5 + this.ENSTRStat;
    this.ENPDEF = 5 + (0.1 * this.ENSTRStat);
    this.ENSTR = this.ENSTRStat;
    console.log(PassiveParam);
    this.ENPassive = PassiveParam;
    game.physics.enable(this.enemysprite, Phaser.Physics.ARCADE);
    this.enemysprite.inputEnabled = true;

}

/**
 * Tile Prototype, used by MakeObject mainly.
 * @param game
 * @param xpos
 * @param ypos
 * @param basetile
 * @param scalenum
 * @constructor
 */
function TileProto(game, xpos, ypos, basetile, scalenum){
    this.TileXPos = xpos;
    this.TileYPos = ypos;
    this.TileType = 2;
    this.BaseTile = game.add.sprite(xpos, ypos, basetile);
    this.BaseTile.scale.setTo(scalenum, scalenum);
    game.physics.enable(this.BaseTile, Phaser.Physics.ARCADE);

    //this.BaseTile.scale.setTo(scalenum, scalenum);
    //this.Tilesprite = new MakeObject(game, this, xpos, ypos, spritenamezero, spritenameone);
    //this.TileSprite.scale.setTo(scalenum, scalenum);
}

/**
 * Chest Prototype, used in ChestGen.
 * @param game
 * @param IDParam
 * @param xpos
 * @param ypos
 * @param loot
 * @param scalenum
 * @constructor
 */
function ChestProto(game, IDParam, xpos, ypos, loot, scalenum){
    this.ID = IDParam;
    this.Looted = false;
    this.chestsprite = game.add.sprite(xpos, ypos, 'DHChest');
    this.chestsprite.scale.setTo(scalenum, scalenum);
    this.ChestLoot = loot;
    console.log(this.ChestLoot);
    game.physics.enable(this.chestsprite, Phaser.Physics.ARCADE)
    this.chestsprite.inputEnabled = true;


}
/**
 * Iterates through the grid and creates the map. This originally generated all objects but those functions were moved to be their own things, so this mainly creates floor tiles, wall and bedrock tiles and a staircase
 * @param game
 * @param obj
 * @param GridX
 * @param GridY
 * @param xpos
 * @param ypos
 * @param spritenamezero
 * @param spritenameone
 * @param spritenametwo
 * @param spritenamethree
 * @param spritenamefour
 * @param spritenamefive
 * @param spritenamesix
 * @param scalenum
 * @param PCParam
 * @param EnemyArr
 * @param ChestArr
 * @param StairObject
 * @constructor
 */
function MakeObject(game, obj, GridX, GridY, xpos, ypos, spritenamezero, spritenameone, spritenametwo, spritenamethree, spritenamefour, spritenamefive, spritenamesix, scalenum, PCParam, EnemyArr, ChestArr, StairObject) {
    console.log("The Tiletype is " + obj.TileType);

    if (obj.TileType === 0) {
        obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenamezero);
        obj.TileSprite.scale.setTo(scalenum, scalenum);
    }
    else if (obj.TileType === 1) {
        obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenameone);
        obj.TileSprite.scale.setTo(scalenum, scalenum);
    }
    else if (obj.TileType === 2) {
        obj.TileSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenametwo);
        obj.TileSprite.scale.setTo(scalenum, scalenum);
    }
    else if (obj.TileType === 3) {
    }
    else if (obj.TileType === 4) {
    }
    else if (obj.TileType === 5) {
        console.debug("Generating player");
    }
    else if (obj.TileType === 6) {
        console.log("Spawning Staircase");
        //if (Object.getOwnPropertyNames(StairObject).length === 0){
            obj.TileX = GridX;
            obj.TileY = GridY;
            obj.StairSprite = game.add.sprite(obj.TileXPos, obj.TileYPos, spritenamesix);
            obj.StairSprite.scale.setTo(scalenum, scalenum);
            game.physics.enable(obj.StairSprite, Phaser.Physics.ARCADE);
            obj.StairSprite.inputEnabled = true;
    }
}
