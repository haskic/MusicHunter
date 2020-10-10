import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Track from './Track';
import API from './../../api/api';

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
    coverImage: "https://localhost:5001/images/7390833756D88518B3DCFD42C64FAE9B72C21C69FFC89C1200CC75F664D7CF6D.jpg",
    src: default_music,
    hash: "qwerty5"
}

function TrackViewer(props) {

    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        API.getTracks(props.store.currentUser.hash, props.store.currentUser.token, (res) => {
            console.log("TRACK DATA = ", res);
            setTracks(JSON.parse(res.data.tracks));
            console.log("TRACK DATA = ", res);
        });
    }, [])
    return (<div className="track-viewer">
        {/* <Track track={default_track1}></Track>
        <Track track={default_track2}></Track>
        <Track track={default_track3}></Track>
        <Track track={default_track4}></Track>
        <Track track={default_track5}></Track> */}
        {tracks.map && tracks.map((value) => {
            console.log("IMAGE URL =",value.ImageUrl);
            return <Track track={value}></Track>
        })}

    </div>);
}


export default connect(
    state => ({ store: state }),
)(TrackViewer);