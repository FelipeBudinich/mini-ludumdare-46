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
        points: new ig.Font('media/gfx/fat_kid_8.png'),
        
        ingameMusic: new ig.Sound('media/snd/msc/ingame.*'),

        init: function () {
            this.initMusic();
            this.infiniteLevel = new ig.InfiniteLevel(
                [
                    Level01,
                    Level02,
                    Level03,
                    Level04,
                    Level05,
                    Level06,
                    Level07,
                    Level08,
                    Level09
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
            this.camera();
            
        },
        
        camera: function () {
            
            this.counter += 3 * ig.system.tick;
            if (this.counter > 6) {
                var i = (Math.floor(5*Math.random())+1) * 2;
                this.counter = 0;  
                this.spawnBubbles(i);
                this.spawnEnemy(i);
            }
            this.screen.x = this.player.pos.x - ig.system.width * 0.125;
            this.screen.y = 15 + Math.sin(this.counter);
        },
        
        spawnEnemy: function (i) {
            i = i / 2;
            do {
            if (Math.random() > 0.75){
                ig.game.spawnEntity(ig.EntityAnchor, ig.system.width * ((2 * Math.random())+1.5), -((22 * Math.random())+40));
            } else {
                ig.game.spawnEntity(ig.EntityRock, ig.system.width * ((2 * Math.random())+1.5), ig.system.height -((22 * Math.random())));
            }
            } while (i = i - 1)
        },
        
        spawnBubbles: function (i) {
            do {
                ig.game.spawnEntity(ig.EntityBubble, ig.game.player.pos.x * ((5 * Math.random())+i), ig.system.height * (Math.random() * i) + 1);
            } while (i = i - 1)
        },

        draw: function () {
            // Call the parent implementation to draw all Entities and BackgroundMaps
            this.parent();
            if (ig.game.alive){
            this.points.draw( ig.game.distanceDisplay + '.MTS', 160, 12, ig.Font.ALIGN.RIGHT);
            }
            
        }
    });
});