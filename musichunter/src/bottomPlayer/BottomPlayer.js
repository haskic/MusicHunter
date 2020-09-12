import React, { useState, useEffect, useReducer } from 'react';
import { ReactReduxContext, connect } from 'react-redux';

import './scss/BottomPlayer.scss';

import startIcon from './icons/start.png';
import endIcon from './icons/end.png';
import playIcon from './icons/play.png';
import pauseIcon from './icons/pause.png';
import shuffleIcon from './icons/shuffle.png';
import repeatIcon from './icons/repeat.png';
import song from './../shakira.mp3';
import reducer from './reducer/reducer';
import VolumeBar from './volumeBar/VolumeBar';
import Playlist from './playlist/Playlist';
import SongExposition from './songExposition/SongExposition';
import defaultCover from "./../AlbumCover.jpeg"

function BottomPlayer(props) {
    const [progressedTimelineWidth, setprogressedTimelineWidth] = useState(0);
    let progressPointerIsActive = false;
    const [intervalTimeLineUpdate, setintervalTimeLineUpdate] = useState(false);
    const [playerState, dispatch] = useReducer(reducer, { icon: playIcon, isPlaying: false, audio: { name: "default", duration: 1, currentTime: 2 } });
    const [isShowPointer, setisShowPointer] = useState(false);
    let timeLineProgressBar;
    let audioPlayer;
    useEffect(() => {
        timeLineProgressBar = {
            rect: document.getElementsByClassName("bottom-player-container-progressbar-timeline")[0].getBoundingClientRect(),
        }
        audioPlayer = document.getElementById("audio-player");
    });

    useEffect(() => {
        fullClearInterval();
        audioPlayer.onloadedmetadata = function () {
            dispatch({ type: "SET_DURATION", duration: audioPlayer.duration });
            dispatch({ type: "SET_CURRENT_TIME", currentTime: audioPlayer.currentTime });

            console.log("ONEDEDEDEDEDEDEDED")
            if (props.store.isPlaying && playerState.isPlaying) {
                play();
            }
            else {
                if (props.store.isPlaying && playerState.isPlaying) {
                    play();
                }
            }
        }
    }, [props.store.currentSong]);
    useEffect(() => {
        playerEventHandler();
        console.log("ONEDEDEDEDEDEDEDED NONONONONONON")

    }, [props.store.isPlaying]);
    useEffect(() => {
        audioPlayer.onended = function () {
            console.log("NEW URL = ", props.store.playlist.tracklist[props.store.playlistCounter]);
            // console.log("NEW URL = ", props.store.playlist.tracklist[props.store.playlistCounter + 1].url);
            console.log("PLAYLIST = ",props.store.playlist);
            console.log("NEXT SONG = ",props.store.playlist.tracklist[props.store.playlistCounter + 1]);
            props.changeSong("");

            props.changeSong(props.store.playlist.tracklist[props.store.playlistCounter + 1]);

            props.changeCurrentTrack(props.store.playlistCounter + 1);
        }   
    }, [props.store.playlistCounter,props.store.playlist]);

    function timeLineClickHandler(e) {
        let progressedLineWidth = 100 * (e.pageX - timeLineProgressBar.rect.left) / (timeLineProgressBar.rect.width);
        setprogressedTimelineWidth(progressedLineWidth);
        audioPlayer.currentTime = audioPlayer.duration * progressedLineWidth / 100;
    }
    function mouseDownProgressPointerHandler(e) {
        progressPointerIsActive = true;
        fullClearInterval();
        document.addEventListener('mousemove', mouseMoveHandler, false);
        document.addEventListener('mouseup', mouseUpHandler, false);
    }
    function mouseMoveHandler(e) {
        if (progressPointerIsActive) {
            if (e.pageX < timeLineProgressBar.rect.left) {
                setprogressedTimelineWidth(0);
                dispatch({ type: "SET_CURRENT_TIME", currentTime: 0 });
                return;
            }
            else if (e.pageX > timeLineProgressBar.rect.right) {
                setprogressedTimelineWidth(100);
                dispatch({ type: "SET_CURRENT_TIME", currentTime: audioPlayer.duration });
                return;
            }
            let progressedLineWidth = 100 * (e.pageX - timeLineProgressBar.rect.left) / (timeLineProgressBar.rect.width);
            setprogressedTimelineWidth(progressedLineWidth);
            dispatch({ type: "SET_CURRENT_TIME", currentTime: audioPlayer.duration * progressedLineWidth / 100 });
        }
    }
    function mouseUpHandler(e) {
        progressPointerIsActive = false;
        timeLineClickHandler(e);
        if (playerState.isPlaying) {
            // fullClearInterval();
            setintervalTimeLineUpdate(setInterval(() => {
                dispatch({ type: "SET_CURRENT_TIME", currentTime: audioPlayer.currentTime });
                let progressedLineWidth = 100 * audioPlayer.currentTime / (audioPlayer.duration);
                setprogressedTimelineWidth(progressedLineWidth);
            }, 100));

        }
        document.removeEventListener('mousemove', mouseMoveHandler, false);
        document.removeEventListener('mouseup', mouseUpHandler, false);
    }
    function playButtonToggle() {
        if (!props.store.isPlaying) {
            play();
            props.changeIsPlayingState(true);
        }
        else {
            pause();
            props.changeIsPlayingState(false);
        }
    }
    function play() {
        if (audioPlayer.paused) {
            dispatch({ type: 'PLAY' });
            audioPlayer.play();
            dispatch({ type: "SET_DURATION", duration: audioPlayer.duration });
            // fullClearInterval();

            setintervalTimeLineUpdate(setInterval(() => {
                dispatch({ type: "SET_CURRENT_TIME", currentTime: audioPlayer.currentTime });
                let progressedLineWidth = 100 * audioPlayer.currentTime / (audioPlayer.duration);
                setprogressedTimelineWidth(progressedLineWidth);
            }, 100));

        }
    }
    function pause() {
        dispatch({ type: 'PAUSE' });
        audioPlayer.pause();
        fullClearInterval();
    }
    function playerEventHandler() {
        if (playerState.isPlaying == props.store.isPlaying) {
            console.log("ULETEL");
            return 0;
        }
        else {
            console.log("ULETEL NET");
            if (props.store.isPlaying) {
                play();
            }
            else {
                pause();
            }
        }
    }
    function fullClearInterval() {
        clearInterval(intervalTimeLineUpdate);
        setintervalTimeLineUpdate(false);
    }


    function timeLineMouseEnterHandler(){
        setisShowPointer(true);
    }
    function timeLineMouseLeaveHandler(){
        setisShowPointer(false);
    }
    return (
        <div className="bottom-player">
            <ReactReduxContext.Consumer>
                {({ store }) => <audio id="audio-player" src={store.getState().currentSong.hashUrl} type="audio/mpeg" >
                </audio>}
            </ReactReduxContext.Consumer>
            <div className="bottom-player-container" onDragStart={(e) => e.preventDefault()}>
                <div className="bottom-player-container-button-panel noselect">
                    <div><img src={startIcon}></img></div>
                    <div onClick={(e) => playButtonToggle(e)}><img src={playerState.icon}></img></div>
                    <div><img src={endIcon}></img></div>
                    <div><img src={shuffleIcon}></img></div>
                    <div><img src={repeatIcon}></img></div>
                </div>
                <div className="bottom-player-container-progressbar"  >
                    <div className="bottom-player-container-progressbar-current-time noselect">{playerState.audio.currentTime}</div>
                    <div className="bottom-player-container-progressbar-timeline" onMouseDown={(e) => mouseDownProgressPointerHandler(e)} onClick={(e) => timeLineClickHandler(e)} onMouseEnter={timeLineMouseEnterHandler} onMouseLeave={timeLineMouseLeaveHandler}>
                        <div className="bottom-player-container-progressbar-timeline-line"></div>
                        <div className="bottom-player-container-progressbar-timeline-line-progressed" style={{ width: progressedTimelineWidth + "%" }}>
                            {isShowPointer?<div className="bottom-player-container-progressbar-timeline-line-progressed-pointer" ></div>: null}
                        </div>
                    </div>
                    <div className="bottom-player-container-progressbar-total-time noselect">{playerState.audio.duration}</div>
                </div>
                <div className="bottom-player-container-volumebar noselect">
                    <VolumeBar></VolumeBar>
                </div>
                <SongExposition artistName={props.store.currentSong.artist} songName={props.store.currentSong.name} albumCoverImage={props.store.currentSong.imageUrl}></SongExposition>
                <div>
                    <Playlist></Playlist>
                </div>
            </div>
        </div>
    );
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
        changeIsPlayingState: (value) => {
            dispatch({ type: 'SET_PLAYING_STATE', isPlaying: value })
        },
        changeSong: (value) => {
            dispatch({ type: 'SET_SONG', song: value })
        },
    })
)(BottomPlayer);