/*global ig, Ingame: true*/
ig.module(
    'game.scenes.ingame'
).requires(
    'impact.game'
).defines(function () {
    'use strict';
    ig.Ingame = ig.Game.extend({
        
        clearColor: "#27334e",

        init: function () {
            
        },

        update: function () {
            // Update all entities and BackgroundMaps
            this.parent();

        },

        draw: function () {
            // Call the parent implementation to draw all Entities and BackgroundMaps
            this.parent();
        }
    });
});