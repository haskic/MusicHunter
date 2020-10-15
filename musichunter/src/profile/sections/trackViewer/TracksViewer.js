import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Track from './Track';
import API from './../../api/api';

import './scss/TrackViewer.scss';



function TrackViewer(props) {

    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        API.getTracks(props.userHash, props.store.currentUser.token, (res) => {
            console.log("TRACK DATA = ", res);
            console.log("TRACK DOWNLOAD FROM SERVER = ", res);

            setTracks(JSON.parse(res.data.tracks));
        });
    }, []);
    function setPlaylistByTrack(trackIndex) {
        props.changePlaylist({
            tracks: tracks,
            name: `Tracks of User ${props.userHash}`,
            type: 'playlist',
            hash: `tracks${props.userHash}`,

        });
        console.log("TRACK INDEX = = = = = = = ", trackIndex);
        props.changePlaylistCounter(trackIndex);
    }


    return (<div className="track-viewer">
        
        {/* <Track track={default_track1}></Track>
        <Track track={default_track2}></Track>
        <Track track={default_track3}></Track>
        <Track track={default_track4}></Track>
        <Track track={default_track5}></Track> */}
        {tracks.map((value, index) => {
            console.log("IMAGE URL =", value.ImageUrl);
            return <Track track={value} index={index} clickHandler={(trackIndex) => setPlaylistByTrack(trackIndex)}></Track>
        })}

    </div>);
}


export default connect(
    state => ({ store: state }),
    dispatch => ({
        changePlaylist: (value) => {
            dispatch({ type: 'SET_PLAYLIST', playlist: value })
        },
        changePlaylistCounter: (value) => {
            dispatch({ type: 'PLAYLIST_SET_COUNTER', counterValue: value })
        },
    })
)(TrackViewer);