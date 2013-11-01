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
            //Cache Busting
            ig.setNocache(true);
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
