ig.module(
'game.data.music-manager'
)
.requires(
'impact.impact'
)
.defines(function(){

ig.musicManager = ig.Class.extend({

	musicTracks : {},	
	
    staticInstantiate: function(ignore) {
        if( ig.ResourceManager == null ) {
            return null;
        } 
        return ig.ResourceManager.instance;
    },
	init: function(){
		
		// Singleton instance assignation
		ig.ResourceManager.instance = this;
	},
	addMusicTrack: function(fileName, trackName){
		this.musicTracks[trackName] = fileName;
	},
	getMusicTrack: function(trackName){
		return this.musicTracks[trackName];
	}
});

});

