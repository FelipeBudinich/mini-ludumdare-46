/*jslint browser: true*/
/*global ig, Ingame: true*/
ig.module(
    'game.scenes.title'
).requires(
    'impact.game'
).defines(function () {
    'use strict';
    ig.Title = ig.Game.extend({
        
        clearColor: "#d7e894",
        
        titleMusic: new ig.Sound('media/snd/msc/title.*'),
        
        logoImage: new ig.Image('media/gfx/bkg/logo.png'),
        logoX: 0,
        logoY: 0,
        backgroundImage_01: new ig.Image('media/gfx/bkg/title_bg.png'),
        bkg_01X: 0,
        bkg_01Y: 0,
        backgroundImage_02: new ig.Image('media/gfx/bkg/title_bg.png'),
        bkg_02X: 144,
        counter: 0,

        init: function () {
            this.initMusic();
        },
        
        initMusic: function () {
            if (ig.music.tracks.length >= 1) {
                ig.music.tracks.shift();
            }
            ig.music.add(this.titleMusic, 'title');
            ig.music.play('title');
        },

        update: function () {
            // Update all entities and BackgroundMaps
            this.parent();
            this.animateLogo(this.logoX, this.logoY);
            this.animateBackground();
            this.handleInput();
           
        },
        
        handleInput: function () {
            // Check for buttons; start the game if pressed
            if (ig.input.pressed('up') || ig.input.pressed('down') || ig.input.pressed('left') || ig.input.pressed('right')) {
                ig.system.setGame(ig.Ingame);
                return;
            }
            
        },
        
        animateLogo: function (x, y) {
            
            this.counter += 3 * ig.system.tick;
            
            this.logoX = Math.cos(this.counter) - 4;
            this.logoY = Math.sin(this.counter);

        },
        
        animateBackground: function () {
            this.bkg_01X += 6 * ig.system.tick;
            this.bkg_02X = this.bkg_01X - 160;
            
            if (this.bkg_01X > 160) {
                this.bkg_01X = 0;
            }
            
            this.bkg_01Y = (Math.sin(this.counter) * 2) - 8;
            
        },

        draw: function () {
            // Call the parent implementation to draw all Entities and BackgroundMaps
            this.parent();
            this.backgroundImage_01.draw(this.bkg_01X, this.bkg_01Y);
            this.backgroundImage_02.draw(this.bkg_02X, this.bkg_01Y);
            this.logoImage.draw(this.logoX, this.logoY);
            
        }
    });
});