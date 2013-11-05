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
        size: {x: 16, y: 8},
        offset: {x: 16, y: 7},
        
        accel: 200,
        vel: {x: 100, y: 0},
        maxVel: {x: 200, y: 150},
        friction: {x: 0, y: 4000},
        
        type: ig.Entity.TYPE.A, // Player friendly group
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.FIXED,
        
        animSheet: new ig.AnimationSheet('media/gfx/spr/shark.png', 40, 20),
                
        health: 3,
        maxHealth: 3,
        distance: 0,
    
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            
            // Add the animations
            this.addAnim('swim', 0.12, [0, 1, 2, 1, 0]);
    
            // Set a reference to the player on the game instance
            ig.game.player = this;
            ig.game.alive = true;
            this.distance = 0;
            
            ig.game.distanceDisplay = 0;
        },
        
        
        update: function () {
    
            // Handle user input; move up or down
            if (ig.input.state('up')) {
                this.vel.y = -this.accel;
            } else if (ig.input.state('down')) {
                this.vel.y = this.accel;
            }  
            
            if (ig.input.state('left')) {
                this.vel.x = 25;
            } else if (ig.input.state('right')) {
                this.vel.x = this.accel;
            } else {
                this.vel.x = 100;
            }
            
            
            this.distance += this.vel.x * ig.system.tick / 100;
            ig.game.distanceDisplay = Math.floor(this.distance);
            
            // Move!
            this.parent();
           
            if (this.pos.y > ig.system.height * 0.95) {
                this.pos.y = ig.system.height * 0.95;
            } else if (this.pos.y < ig.system.height * 0.15) {
                this.pos.y = ig.system.height * 0.15;
            }
            
    
        },
    
        kill: function () {
            ig.game.alive = false;
            this.parent();
            
            //save points etc
        },
        
        check: function (other) {
            ig.game.spawnEntity(ig.EntityExplosion, this.pos.x, this.pos.y);
            
            this.kill();
        }
    });
});