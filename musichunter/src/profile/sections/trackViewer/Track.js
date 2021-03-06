import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import playIcon from './../../../bottomPlayer/icons/play.png';
import pauseIcon from './../../../bottomPlayer/icons/pause.png';

import './scss/Track.scss';
import TrackDiagram from './TrackDiagram';

function Track(props) {
    const [isPlaying, setisPlaying] = useState(false);
    const [points, setPoints] = useState(JSON.parse(props.track.histogram).pointArray);

    function controlClickHandler() {
        if (isPlaying) {
            props.changeIsPlayingState(false);
            setisPlaying(false);
        }
        else {
            if (props.store.currentSong.hashUrl !== props.track.hashUrl) {
                console.log("TRACKE CHANGE WOWOWOWOWWOWOOWOWOWOWOWOWOWO");

                props.changeSong(props.track);
                props.clickHandler(props.index);
            }
            props.changeIsPlayingState(true);
            setisPlaying(true);
        }
    }
    useEffect(() => {
        if (props.store.currentSong.hashUrl == props.track.hashUrl) {
            if (props.store.isPlaying) {
                setisPlaying(true);
                console.log("AAA");
            }
            else {
                console.log("BBB");
                setisPlaying(false);
            }
        }   
        else {
            console.log("CCC");
            setisPlaying(false);
        }
    }, [props.store.currentSong, props.store.isPlaying]);
    // useEffect(() => {
        
    // }, [])
    return (<div className="track-container">
        <div className="album-cover">
            <img src={props.track.imageUrl}></img>
        </div>
        <div className="track-data">
            <div className="track-control-info">
                <div className="track-control" onClick={controlClickHandler}>
                    {isPlaying ? <img src={pauseIcon}></img> : <img src={playIcon}></img>}
                </div>
                <div className="track-info">
                    <div className="track-artist">{props.track.artist}</div>
                    <div className="track-name">{props.track.name}</div>
                </div>
            </div>
            <TrackDiagram hashUrl={props.track.hashUrl} points={points} isActive={isPlaying}></TrackDiagram>
            <div className="track-options">
                <button>Like</button>
                <button>Reposts</button>
                <button>Share</button>
            </div>
        </div>
    </div>)
}

export default connect(
    state => ({ store: state }),
    dispatch => ({
        changeIslogin: (value) => {
            dispatch({ type: 'ZHAKAR', isLogin: value })
        },
        changeCurrentTrack: (value) => {
            dispatch({ type: 'PLAYLIST_SET_COUNTER', counterValue: value })
        },
        changePlayingToggle: () => {
            dispatch({ type: 'PLAYING_TOGGLE' })
        },
        changeSong: (value) => {
            dispatch({ type: 'SET_SONG', song: value })
        },
        changeIsPlayingState: (value) => {
            dispatch({ type: 'SET_PLAYING_STATE', isPlaying: value })
        },

    })
)(Track);
