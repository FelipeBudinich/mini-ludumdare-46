/*jslint browser: true*/
/*global ig, Ingame: true*/
ig.module(
    'game.scenes.ingame'
).requires(
    'impact.game'
).defines(function () {
    'use strict';
    ig.Ingame = ig.Game.extend({
        
        clearColor: "#d7e894",
        
        ingameMusic: new ig.Sound('media/snd/msc/ingame.*'),

        init: function () {
            this.initMusic();
        },
        
        initMusic: function () {
            if (ig.music.tracks.length >= 1) {
                ig.music.tracks.shift();
            }
            ig.music.add(this.ingameMusic, 'ingame');
            ig.music.play('ingame');
        },

        update: function () {
            // Update all entities and BackgroundMaps
            this.parent();
            this.handleInput();
        },
        
        handleInput: function () {
            // Check for buttons; start the game if pressed
            if (ig.input.pressed('action_01') || ig.input.pressed('action_02')) {
                ig.system.setGame(ig.Title);
                return;
            }
        },

        draw: function () {
            // Call the parent implementation to draw all Entities and BackgroundMaps
            this.parent();
        }
    });
});