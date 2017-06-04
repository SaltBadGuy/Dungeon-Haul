/**
 * Created by Callum on 26/04/2017.
 */
BasicGame.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

BasicGame.Preloader.prototype = {

    preload: function () {

        //	These are the assets we loaded in Boot.js
        //	A nice sparkly background and a loading progress bar
        //this.background = this.add.sprite(0, 0, 'preloaderBackground');
        //this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

        //	This sets the preloadBar sprite as a loader sprite.
        //	What that does is automatically crop the sprite from 0 to full-width
        //	as the files below are loaded in.
        //this.load.setPreloadSprite(this.preloadBar);

        //	Here we load the rest of the assets our game needs.
        //	As this is just a Project Template I've not provided these assets, swap them for your own.
        //this.load.image('titlepage', 'images/title.jpg');
        //this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
        //this.load.audio('titleMusic', ['audio/main_menu.mp3']);
        //this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
        //	+ lots of other required assets here
        //Sprites
        // Player character sprite
        this.load.image('DHPC', 'Assets/DHPC.png');
        //Floor tile sprite
        this.load.image('DHFloor', 'Assets/DHFloor.png');
        //Wall tile sprite
        this.load.image('DHWall', 'Assets/DHStoneWall1.png');
        //Bedrock tile sprite
        this.load.image('DHBedrock', 'Assets/DHBedrock.png');
        //Chest Sprite
        this.load.image('DHChest', 'Assets/DHChest.png');
        //Enemy 0 Sprite
        this.load.image('DH0', 'Assets/DHZombie.png');
        //Enemy 1 Sprite
        this.load.image('DH1', 'Assets/DHSkeleton.png');
        //Enemy 2 Sprite
        this.load.image('DH2', 'Assets/DHDemon.png');
        //Staircase sprite
        this.load.image('DHStairs', 'Assets/DHStairs.png');
        //HUD sprite
        this.load.image('DHHUD', 'Assets/DHHUD.png');
        //Text file with hints
        this.load.text('Hints', 'Assets/Hints.txt');

        console.log("Finished preloading assets!");

    },

    create: function () {

        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        //this.preloadBar.cropEnabled = false;

    },

    update: function () {

        //	You don't actually need to do this, but I find it gives a much smoother game experience.
        //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //	You can jump right into the menu if you want and still play the music, but you'll have a few
        //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
        //	it's best to wait for it to decode here first, then carry on.

        //	If you don't have any music in your game then put the game.state.start line into the create function and delete
        //	the update function completely.

        /*
        if (this.cache.isSoundDecoded('titleMusic') && this.ready === false)
        {
            this.ready = true;
            this.state.start('MainMenu');
        }*/

        console.log("Finished Preloader!");
        this.state.start('MainMenu');
    }

};