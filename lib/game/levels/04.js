ig.module('game.levels.04')
    .requires('impact.image')
    .defines(function () {
    Level04 = /*JSON[*/ {
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
                "data": [[5, 5, 5, 5, 5], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [4, 2, 3, 2, 4]]
            }]
    } /*]JSON*/ ;
    Level04Resources = [new ig.Image('media/gfx/bkg/sea_bottom.png')];
});