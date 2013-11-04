ig.module('game.levels.09')
    .requires('impact.image')
    .defines(function () {
    Level09 = /*JSON[*/ {
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
                "data": [[5, 5, 5, 5, 5], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 2, 1, 1, 3]]
            }]
    } /*]JSON*/ ;
    Level09Resources = [new ig.Image('media/gfx/bkg/sea_bottom.png')];
});