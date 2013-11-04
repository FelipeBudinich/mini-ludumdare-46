/*jslint browser: true*/
/*global ig, Ingame: true*/
ig.module(
    'game.scenes.ingame'
).requires(
    'impact.game'
).defines(function () {
    'use strict';
    ig.Ingame = ig.Game.extend({
        
        clearColor: "#aec440",
        counter: 0,
        
        ingameMusic: new ig.Sound('media/snd/msc/ingame.*'),

        init: function () {
            this.initMusic();
            this.infiniteLevel = new ig.InfiniteLevel(
                [
                    Level01,
                    Level02,
                    Level03
                ]
            );
            ig.game.spawnEntity(ig.EntityPlayer, ig.system.width * 0.5, ig.system.height * 0.5);
        },
        
        initMusic: function () {
            if (ig.music.tracks.length >= 1) {
                ig.music.tracks.shift();
            }
            ig.music.add(this.ingameMusic, 'ingame');
            ig.music.play('ingame');
        },

        update: function () {
            // Update all entities and BackgroundMaps
            this.infiniteLevel.update();
            this.parent();
            this.handleInput();
            this.camera();
        },
        
        camera: function () {
            
            this.counter += 3 * ig.system.tick;
            if (this.counter > 6) {
                var i = (Math.floor(5*Math.random())+1) * 2;
                this.counter = 0;  
                do {
                ig.game.spawnEntity(ig.EntityBubble, this.player.pos.x * ((5 * Math.random())+i), ig.system.height * (Math.random() * i) + 1);
                } while (i = i - 1)
                    
                ig.game.spawnEntity(ig.EntityAnchor, ig.system.width * ((2 * Math.random())+1), -((22 * Math.random())+40));
            }
            this.screen.x = this.player.pos.x - ig.system.width * 0.025;
            this.screen.y = 15 + Math.sin(this.counter);
        },
        
        handleInput: function () {
            // Check for buttons; start the game if pressed
            if (ig.input.pressed('action_01') || ig.input.pressed('action_02')) {
                ig.system.setGame(ig.Title);
                return;
            }
        },

        draw: function () {
            // Call the parent implementation to draw all Entities and BackgroundMaps
            this.parent();
        }
    });
});