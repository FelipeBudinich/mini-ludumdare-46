ig.module('game.levels.start')
    .requires('impact.image')
    .defines(function () {
    LevelStart = /*JSON[*/ {
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
                "data": [[5, 5, 5, 5, 5], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [4, 2, 1, 1, 3]]
            }]
    } /*]JSON*/ ;
    LevelStartResources = [new ig.Image('media/gfx/bkg/sea_bottom.png')];
});