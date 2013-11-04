/*global ig, EntityPlayer: true*/
ig.module(
	'game.entities.bubble'
).requires(
	'impact.entity'
).defines(function () {
    'use strict';
    ig.EntityBubble = ig.Entity.extend({
        size: {x: 8, y: 5},
        vel: {x: 0, y: -100},
        maxVel: {x: 0, y: 200},
        type: ig.Entity.TYPE.A, // Player friendly group
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.LITE,
        animSheet: new ig.AnimationSheet('media/gfx/spr/bubbles.png', 8, 5),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            // Add the animations
            this.addAnim('float', 0.2, [5, 4, 3, 2, 1, 0]);
            this.vel.x = Math.random() * 50;
        },
        update: function () {

            this.parent();
            if (this.pos.y < 0) {
                this.kill();
            }
        }
    });
});