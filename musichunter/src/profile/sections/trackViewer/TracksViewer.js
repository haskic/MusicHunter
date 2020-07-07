import React from 'react'
import Track from './Track';


import './scss/TrackViewer.scss';
import default_cover from './../../../AlbumCover.jpeg';

const default_track = {
    name: "Box Chevy 5",
    artist: "Yelawolf",
    coverImage: default_cover
}

function TrackViewer(props){

    return(<div className="track-viewer">
        <Track track={default_track}></Track>
        <Track track={default_track}></Track>
        <Track track={default_track}></Track>
        <Track track={default_track}></Track>
        <Track track={default_track}></Track>

    </div>);
}


export default TrackViewer;