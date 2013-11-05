/*global ig, EntityPlayer: true*/
ig.module(
	'game.entities.highscore'
).requires(
	'impact.entity'
).defines(function () {
    'use strict';
    ig.EntityHighscore = ig.Entity.extend({
        size: {x: 0, y: 0},
        type: ig.Entity.TYPE.NONE, // Player friendly group
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        sfxScore: new ig.Sound('media/snd/sfx/highscore.*'),
        points: new ig.Font('media/gfx/fat_kid.png'),
        phrase: new ig.Font('media/gfx/fat_kid_8.png'),
        highscore: false,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            // Add the animations
            ig.game.player = this;
            this.highscore = storage.isHigher('distance', ig.game.distanceDisplay);
            storage.setHigher('distance', ig.game.distanceDisplay);
            this.sfxScore.play();
        },
        update: function () {
            this.parent();
            if (ig.input.pressed('up') || ig.input.pressed('down') || ig.input.pressed('left') || ig.input.pressed('right')) {
                this.kill();
                return;
            }
        },
        draw: function () {
            if (this.highscore){
                var retryString = 'PRESS\n A KEY \n TO RETRY ';
                this.points.draw( 'NEW\nHIGHSCORE\n' + ig.game.distanceDisplay + '.MTS', ig.system.width * 0.5, ig.system.height * 0.1, ig.Font.ALIGN.CENTER);
                this.phrase.draw( retryString, ig.system.width * 0.5, ig.system.height * 0.5, ig.Font.ALIGN.CENTER);
            } else {
                var retryString = 'PRESS\n A KEY \n TO RETRY ';
                this.points.draw( ig.game.distanceDisplay + '.MTS', ig.system.width * 0.5, ig.system.height * 0.25, ig.Font.ALIGN.CENTER);
                this.phrase.draw( retryString, ig.system.width * 0.5, ig.system.height * 0.4, ig.Font.ALIGN.CENTER);
            }
            
            this.parent();
        },
        kill: function () {
            ig.system.setGame(ig.Title);
            this.parent();   
        }
    });
});