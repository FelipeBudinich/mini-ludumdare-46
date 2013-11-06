/*jslint browser: true*/
/*global ig, gp*/
ig.module(
	'game.main'
).requires(
	'impact.game',
    //'impact.debug.debug',
    //Data
    'game.data.storage',
    //Scenes
    'game.scenes.ingame',
    'game.scenes.title',
    //Levels
    'plugins.impact-infinite',
    'game.levels.start',
    'game.levels.01',
    'game.levels.02',
    'game.levels.03',
    'game.levels.04',
    'game.levels.05',
    'game.levels.06',
    'game.levels.07',
    'game.levels.08',
    'game.levels.09',
    //Entities
    'game.entities.player',
    'game.entities.anchor',
    'game.entities.rock',
    'game.entities.explosion',
    'game.entities.highscore',
    'game.entities.bubble'
).defines(function () {
    'use strict';
    ig.launchGame = ig.Game.extend({
        
                
        clearColor: "#d7e894",
        
        init: function () {
             //Cache Busting
            ig.setNocache(false);
            // Initialize your game here; bind keys etc.
            this.initInput();
            // Initialize Audio
            this.initAudio();
        },
        initAudio: function () {
            //ig.music.volume = 0;
        },
        initInput: function () {
            // Bind keys
            //Gamepad
            gp.registerGamepadEvents();
            
            //Movement
            ig.input.bind(ig.KEY.UP_ARROW, 'up');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            //Action
            ig.input.bind(ig.KEY.W, 'up');
            ig.input.bind(ig.KEY.S, 'down');
            ig.input.bind(ig.KEY.A, 'left');
            ig.input.bind(ig.KEY.D, 'right');
            
        },
        update: function () {
            // Launch Title Screen
            ig.system.setGame(ig.Title);
        }
    });


    // Start the Game with 60fps, a resolution of 160x144, scaled
    // up by a factor of 4
    ig.System.scaleMode = ig.System.SCALE.CRISP;
    //ig.System.drawMode = ig.System.DRAW.AUTHENTIC;
    ig.main('#canvas', ig.launchGame, 60, 160, 144, 4);

});
