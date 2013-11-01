/*jslint browser: true*/
/*global ig*/
ig.module(
	'game.main'
).requires(
	'impact.game',
    //Scenes
    'game.scenes.ingame',
    'game.scenes.title'
).defines(function () {
    'use strict';
    ig.launchGame = ig.Game.extend({
        init: function () {
            // Initialize your game here; bind keys etc.
            this.initInput();
            //Cache Busting
            ig.setNocache(true);
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
    ig.main('#canvas', ig.launchGame, 60, 400, 240, 2);

});
