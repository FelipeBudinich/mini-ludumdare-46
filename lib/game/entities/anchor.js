/*global ig, EntityAnchor: true*/
ig.module(
	'game.entities.anchor'
).requires(
	'impact.entity'
).defines(function () {
    'use strict';
    ig.EntityAnchor = ig.Entity.extend({
        size: {x: 12, y: 192},
        offset: {x:10, y:0},
        vel: {x: 0, y: 0},
        maxVel: {x: 100, y: 100},
        type: ig.Entity.TYPE.B, // Enemy group
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet('media/gfx/spr/anchor.png', 32, 192),
        
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            // Add the animations
            this.addAnim('anchor', 1, [0]);
            this.vel.y = -(Math.random()*100) - 10;
            this.vel.x = -(Math.random()*50);
        },
        update: function () {
            this.parent();
            if (this.pos.y < -192) {
                this.kill();
            }
        }
    });
});