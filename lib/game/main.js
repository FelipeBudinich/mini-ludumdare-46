/*jslint browser: true*/
/*global ig, gp*/
ig.module(
	'game.main'
).requires(
	'impact.game',
    // Music Manager
    'game.data.music-manager',
    //Scenes
    'game.scenes.ingame',
    'game.scenes.title'
).defines(function () {
    'use strict';
    ig.launchGame = ig.Game.extend({
        
                
        clearColor: "#d7e894",
        
        init: function () {
             //Cache Busting
            ig.setNocache(true);
            // Initialize your game here; bind keys etc.
            this.initInput();
            // Initialize Audio
            this.initAudio();
        },
        initAudio: function () {
            
        },
        initInput: function () {
            // Bind keys
            //Movement
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.bind(ig.KEY.UP_ARROW, 'up');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
            //Action
            ig.input.bind(ig.KEY.Z, 'action_01');
            ig.input.bind(ig.KEY.X, 'action_02');
            ig.input.bind(ig.KEY.C, 'action_03');
            ig.input.bind(ig.KEY.V, 'action_04');
            //Gamepad
            gp.registerGamepadEvents();
        },
        update: function () {
            // Launch Title Screen
            ig.system.setGame(ig.Title);
        }
    });


    // Start the Game with 60fps, a resolution of 400x240, scaled
    // up by a factor of 2
    ig.System.scaleMode = ig.System.SCALE.CRISP;
    //ig.System.drawMode = ig.System.DRAW.AUTHENTIC;
    ig.main('#canvas', ig.launchGame, 60, 160, 144, 4);

});
