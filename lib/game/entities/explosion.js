/*global ig, EntityPlayer: true*/
ig.module(
	'game.entities.explosion'
).requires(
	'impact.entity'
).defines(function () {
    'use strict';
    ig.EntityExplosion = ig.Entity.extend({
        size: {x: 16, y: 12},
        offset: {x:32, y: 32},
        maxVel: {x: 200, y: 200},
        type: ig.Entity.TYPE.A, // Player friendly group
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        animSheet: new ig.AnimationSheet('media/gfx/spr/explosion.png', 90, 76),
        sfxDeath: new ig.Sound('media/snd/sfx/player_death.*'),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            // Add the animations
            this.addAnim('explode', 0.1, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
            ig.game.player = this;
            this.sfxDeath.play();
        },
        update: function () {
            this.parent();
            if (this.currentAnim.frame >= 8) {
             this.kill();
            }
        },
        
        kill: function () {
            ig.game.spawnEntity(ig.EntityHighscore, this.pos.x, this.pos.y);
            this.parent();   
        }
    });
});