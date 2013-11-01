/*jslint browser: true*/
/*global ig, Ingame: true*/
ig.module(
    'game.scenes.title'
).requires(
    'impact.game'
).defines(function () {
    'use strict';
    ig.Title = ig.Game.extend({
        
        clearColor: "#27334e",

        init: function () {
            console.log('loaded');
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