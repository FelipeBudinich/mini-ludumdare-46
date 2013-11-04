// The MIT License (MIT)

// Copyright (c) 2013 Tom Macie

// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
/*global ig, LevelStart*/
ig.module(
	'plugins.impact-infinite'
).requires(
	'impact.system',
	'impact.game'
).defines(function () {
    'use strict';
    ig.InfiniteLevel = ig.Class.extend({
        levels: null,
        start: null,
        init: function (levels, start) {
            this.levels = levels;
            this.start = !start ? null : start;
            var allLevels = this.levels,
                layerNames = [],
                level,
                layer,
                map,
                existingMap,
                data,
                backgroundMap,
                LevelGameData,
                i,
                j;
            if (this.start !== null) {
                allLevels = allLevels.concat([this.start]);
            }
            for (i = 0; i < allLevels.length; i = i + 1) {
                level = allLevels[i];
                for (j = 0; j < level.layer.length; j = j + 1) {
                    layer = level.layer[j];
                    if (layerNames.indexOf(layer.name) === -1) {
                        layerNames.push(layer.name);
                    }
                }
            }
            // copy level data to a new variable so the level is refreshed on restart
            LevelGameData = JSON.parse(JSON.stringify(LevelStart));
            ig.game.loadLevel(LevelGameData);
            for (i = 0; i < layerNames.length; i = i + 1) {
                map = this.getMap(layerNames[i]);
                if (map === false) {
                    // make a new copy of the map
                    existingMap = ig.game.backgroundMaps[0];
                    data = this.getEmptyMapData(existingMap.height, existingMap.width);
                    backgroundMap = new ig.BackgroundMap(existingMap.tilesize, data, existingMap.tilesetName);
                    backgroundMap.anims = {};
                    backgroundMap.repeat = false;
                    backgroundMap.distance = existingMap.distance;
                    backgroundMap.foreground = false;
                    backgroundMap.preRender = false;
                    backgroundMap.name = layerNames[i];
                    ig.game.backgroundMaps.push(backgroundMap);
                }
            }
            ig.game.collisionMap.name = 'collision';
        },
        getMap: function (layerName) {
            var i;
            for (i = 0; i < ig.game.backgroundMaps.length; i = i + 1) {
                if (layerName === ig.game.backgroundMaps[i].name) {
                    return ig.game.backgroundMaps[i];
                } else if (layerName === 'collision') {
                    return ig.game.collisionMap;
                }
            }
            return false;
        },
        getEmptyMapData: function (height, width) {
            var data = [],
                j,
                k,
                row;
            // clear out the data
            for (j = 0; j < height; j = j + 1) {
                row = [];
                for (k = 0; k < width; k = k + 1) {
                    row.push(0);
                }
                data.push(row);
            }
            return data;
        },
        update: function () {
            var i,
                nextLevel,
                entity,
                data,
                j;
            // load a new set piece if necessary
            if (ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize - ig.game.screen.x <= ig.system.width) {
                nextLevel = this.getNextLevel();
                // spawn entites
                for (i = 0; i < nextLevel.entities.length; i = i + 1) {
                    entity = nextLevel.entities[i];
                    ig.game.spawnEntity(
                        entity.type,
                        entity.x + (ig.game.backgroundMaps[0].width * ig.game.backgroundMaps[0].tilesize),
                        entity.y,
                        entity.settings
                    );
                }
                // add the tiles to the level
                for (i = 0; i < ig.game.backgroundMaps.length; i = i + 1) {
                    this.extendMap(ig.game.backgroundMaps[i], nextLevel);
                }
                this.extendMap(ig.game.collisionMap, nextLevel);
            }
            // remove tiles that are no longer visible
            if (ig.game.screen.x >= ig.game.backgroundMaps[0].tilesize) {
                for (i = 0; i < ig.game.backgroundMaps.length; i = i + 1) {
                    data = ig.game.backgroundMaps[i].data;
                    for (j = 0; j < data.length; j = j + 1) {
                        data[j].shift();
                    }
                    ig.game.backgroundMaps[i].width = ig.game.backgroundMaps[i].width - 1;
                }
                if (ig.game.collisionMap.data !== undefined) {
                    for (i = 0; i < ig.game.collisionMap.data.length; i = i + 1) {
                        ig.game.collisionMap.data[i].shift();
                    }
                    ig.game.collisionMap.width = ig.game.collisionMap.width - 1;
                }
                for (i = 0; i < ig.game.entities.length; i = i + 1) {
                    ig.game.entities[i].pos.x -= ig.game.backgroundMaps[0].tilesize;
                }
                ig.game.screen.x -= ig.game.backgroundMaps[0].tilesize;
            }
            // remove entities that are no longer visible
            for (i = 0; i < ig.game.entities.length; i = i + 1) {
                entity = ig.game.entities[i];
                if ((entity.pos.x + entity.size.x) - ig.game.screen.x < 0 || entity.pos.y > ig.game.screen.y + ig.system.height) {
                    entity.kill();
                }
            }
        },
        getNextLevel: function () {
            var nextIdx = Math.floor(Math.random() * this.levels.length);
            return this.levels[nextIdx];
        },
        extendMap: function (map, level) {
            var layer = this.getLayer(map.name, level),
                data,
                j;
            if (!layer) {
                layer = {
                    data: this.getEmptyMapData(
                        level.layer[0].data.length,
                        level.layer[0].data[0].length
                    ),
                    width: level.layer[0].data[0].length
                };
            }
            data = map.data;
            if (data !== undefined) {
                for (j = 0; j < data.length; j = j + 1) {
                    data[j].push.apply(data[j], layer.data[j]);
                }
            }
            map.width += layer.width;
        },
        getLayer: function (layerName, level) {
            var i;
            for (i = 0; i < level.layer.length; i = i + 1) {
                if (layerName === level.layer[i].name) {
                    return level.layer[i];
                }
            }
            return false;
        }
    });
});