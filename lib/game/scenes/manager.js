/*global ig, SceneManager: true*/
ig.module(
    'game.scenes.manager'
).requires(
    'impact.impact'
).defines(function () {
    'use strict';
    ig.SceneManager = ig.Class.extend({
        currentScene: null,

        staticInstantiate: function () {
            if (ig.SceneManager === null) {
                return null;
            }
            return ig.SceneManager.instance;
        },
        init: function () {
            // Singleton instance assignation
            ig.SceneManager.instance = this;
        },
        getCurrentScene: function () {
            return this.currentScene;
        },
        loadScene: function (scene) {

            // Set new scene
            this.currentScene = scene;

            ig.system.setGame(scene);
        }
    });

});