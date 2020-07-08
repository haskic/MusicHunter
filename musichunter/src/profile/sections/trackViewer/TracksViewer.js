import React,{useEffect} from 'react'
import Track from './Track';


import './scss/TrackViewer.scss';
import default_cover from './../../../AlbumCover.jpeg';
import default_music from './../../../yelowolf.mp3';

const default_track1 = {
    name: "Box Chevy 5",
    artist: "Yelawolf",
    coverImage: default_cover,
    src: default_music,
    hash: "qwerty1"
}
const default_track2 = {
    name: "Box Chevy 5",
    artist: "Yelawolf",
    coverImage: default_cover,
    src: default_music,
    hash: "qwerty2"
}
const default_track3 = {
    name: "Box Chevy 5",
    artist: "Yelawolf",
    coverImage: default_cover,
    src: default_music,
    hash: "qwerty3"
}
const default_track4 = {
    name: "Box Chevy 5",
    artist: "Yelawolf",
    coverImage: default_cover,
    src: default_music,
    hash: "qwerty4"
}
const default_track5 = {
    name: "Box Chevy 5",
    artist: "Yelawolf",
    coverImage: default_cover,
    src: default_music,
    hash: "qwerty5"
}

function TrackViewer(props){
    return(<div className="track-viewer">
        <Track track={default_track1}></Track>
        <Track track={default_track2}></Track>
        <Track track={default_track3}></Track>
        <Track track={default_track4}></Track>
        <Track track={default_track5}></Track>

    </div>);
}


export default TrackViewer;