/*global ig, EntityAnchor: true*/
ig.module(
	'game.entities.rock'
).requires(
	'impact.entity',
    'impact.entity-pool'
).defines(function () {
    'use strict';
    ig.EntityRock = ig.Entity.extend({
        size: {x: 4, y: 192},
        offset: {x:15, y:3},
        vel: {x: 0, y: 0},
        maxVel: {x: 0, y: 0},
        type: ig.Entity.TYPE.B, // Enemy group
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        animSheet: new ig.AnimationSheet('media/gfx/spr/rock.png', 32, 192),
        
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            // Add the animations
            this.addAnim('anchor', 1, [0]);
            if (Math.random() > 0.5){
            this.anims.anchor.flip.x = true;
            }
            this.anims.anchor.flip.y = true;
        },
        update: function () {
            this.parent();
            if (this.pos.x < -16) {
                this.kill();
            }
        },
        reset: function( x, y, settings ) {
            // This function is called when an instance of this class is
            // resurrected from the entity pool.
            this.parent( x, y, settings );
            this.vel.y = -(Math.random()*100) - 10;
            this.vel.x = -(Math.random()*50);
         }
    });
    // Enable Pooling!
    ig.EntityPool.enableFor(ig.EntityRock);
});