ig.module('game.levels.05')
    .requires('impact.image')
    .defines(function () {
    Level05 = /*JSON[*/ {
        "entities": [],
        "layer": [{
                "name": "background",
                "width": 5,
                "height": 5,
                "linkWithCollision": false,
                "visible": 1,
                "tilesetName": "media/gfx/bkg/sea_bottom.png",
                "repeat": false,
                "preRender": false,
                "distance": "1",
                "tilesize": 32,
                "foreground": false,
                "data": [[5, 5, 5, 5, 5], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [4, 1, 3, 1, 4]]
            }]
    } /*]JSON*/ ;
    Level05Resources = [new ig.Image('media/gfx/bkg/sea_bottom.png')];
});