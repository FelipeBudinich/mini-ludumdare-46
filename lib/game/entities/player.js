/*global ig, EntityPlayer: true*/
ig.module(
	'game.entities.player'
).requires(
	'impact.entity'
).defines(function () {
    'use strict';
    ig.EntityPlayer = ig.Entity.extend({
	
        // The players (collision) size is a bit smaller than the animation
        // frames, so we have to move the collision box a bit (offset)
        size: {x: 38, y: 16},
        offset: {x: 0, y: 3},
        
        accel: 200,
        vel: {x: 100, y: 0},
        maxVel: {x: 200, y: 200},
        friction: {x: 0, y: 1000},
        
        type: ig.Entity.TYPE.A, // Player friendly group
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.FIXED,
        
        animSheet: new ig.AnimationSheet('media/gfx/spr/shark.png', 40, 20),
        
        //sfxHurt: new ig.Sound( 'media/sounds/hurt.*' ),
        
        health: 3,
        maxHealth: 3,
        distance: 0,
    
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            
            // Add the animations
            this.addAnim('swim', 0.12, [0, 1, 2, 1, 0]);
    
            // Set a reference to the player on the game instance
            ig.game.player = this;
            this.distance = 0;
        },
        
        
        update: function () {
    
            // Handle user input; move left or right
            var accel = this.accel;
            if (ig.input.state('up')) {
                this.vel.y = -accel;
            } else if (ig.input.state('down')) {
                this.vel.y = accel;
            }
            
            
            this.distance += 1 * ig.system.tick;
            
            // Move!
            this.parent();
           
            if (this.pos.y > ig.system.height * 0.95) {
                this.pos.y = ig.system.height * 0.95;
            } else if (this.pos.y < ig.system.height * 0.15) {
                this.pos.y = ig.system.height * 0.15;
            }
            
    
        },
    
        kill: function () {
            this.parent();
            
            //save points etc
        },
    
        pirateKils: function (amount) {
            // Custom function, called from the EntityCoin
            this.coins += amount;
        },
        
        check: function (other) {
            ig.game.spawnEntity(ig.EntityExplosion, this.pos.x - (this.size.x * 0.5), this.pos.y - (this.size.y * 0.5));
            console.log(this.distance * 100);
            this.kill();
        }
    });
});