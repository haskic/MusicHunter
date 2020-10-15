import React, { useState, useEffect } from 'react';
import { ReactReduxContext, connect } from 'react-redux';

import playlistBlackIcon from './../icons/playlistBlack.png';
import playlistBlueIcon from './../icons/playlistBlue.png';
import crossIcon from './../icons/cross.png';
import heartBlackIcon from './../icons/heartBlack.png';
import play2Icon from './../icons/play2.png';
import pause2Icon from './../icons/pause2.png';


import './../scss/Playlist.scss';
import SongExposition from '../songExposition/SongExposition';
import PlaylistIcon from './PlaylistIcon';

function Playlist(props) {
    // const [playlistIcon, setPlaylistIcon] = useState(playlistBlackIcon);
    const [tracklist, setTracklist] = useState([]);
    const [notConvertedTrackList, setnotConvertedTrackList] = useState([]);
    const [currentTrack, setcurrentTrack] = useState(0);
    const [isPlaying, setisPlaying] = useState(false);
    const [isShow, setisShow] = useState(false);
    // function playlistIconToggle() {
    //     if (playlistIcon == playlistBlackIcon) {
    //         setPlaylistIcon(playlistBlueIcon);
    //     }
    //     else {
    //         setPlaylistIcon(playlistBlackIcon);
    //     }
    // }
    function removeClass(str, element) {
        var re = new RegExp(`\\b${str}\\b`, 'gi');
        element.className = element.className.replace(re, "");
    }


    function playlistUpdater(trackArray, playlistCounter, isPlayingGlobal) {
        if (isPlayingGlobal == isPlaying && playlistCounter == currentTrack && notConvertedTrackList[notConvertedTrackList.length - 1]?.name == trackArray[trackArray.length - 1]?.name && notConvertedTrackList.length != 0 && trackArray.length == notConvertedTrackList.length) {
            return 0;
        }
        else {
            if (isPlaying != isPlayingGlobal) {
                setisPlaying(isPlayingGlobal);
            }
            const newTrackList = [];
            setnotConvertedTrackList(trackArray);
            setcurrentTrack(playlistCounter);
            trackArray.forEach((element, index) => {
                if (index != playlistCounter) {
                    newTrackList.push(
                        <div className="track-item" key={index}>
                            <SongExposition artistName={element.artist}
                                songName={element.name} albumCoverImage={element.imageUrl}
                                isShowPlayOnHover={true} playIconImage={play2Icon} pauseIconImage={pause2Icon}
                                isPlaying={false}
                                isShowIcon={false}
                                clickAlbumCoverHandler={() => { props.changePlaylistCounter(index); props.changeSong(element); props.changeIsPlayingState(true); }}></SongExposition>
                            <div className="right-form">
                                <img src={crossIcon} title="remove from Next Up"></img>
                                <img src={heartBlackIcon} title="Like"></img>
                                <div>2:42</div>
                            </div>
                        </div>
                    );
                }
                else {
                    newTrackList.push(
                        <div className="track-item" key={index}>
                            <SongExposition artistName={element.artist} songName={element.name} albumCoverImage={element.imageUrl} playIconImage={play2Icon}
                                pauseIconImage={pause2Icon} isShowIcon={true} isPlaying={isPlayingGlobal ? true : false}
                                clickAlbumCoverHandler={() => { props.changePlayingToggle() }}></SongExposition>
                            <div className="right-form">
                                <img src={crossIcon} title="remove from Next Up"></img>
                                <img src={heartBlackIcon} title="Like"></img>
                                <div>2:42</div>
                            </div>
                        </div>
                    );
                }
            });
            setTracklist(newTrackList);
        }
    }

    function trackRenderer(track, currentSong, trackIndexInPlaylist) {
        // console.log("Track rendere")

        if (track.hashUrl == currentSong.hashUrl) {
            // console.log("hashes equal", track.hashUrl, currentSong.hashUrl)
            return <div className="track-item">
                <SongExposition artistName={track.artist}
                    songName={track.name} albumCoverImage={track.imageUrl}
                    isShowPlayOnHover={false} playIconImage={play2Icon} pauseIconImage={pause2Icon}
                    isPlaying={isPlaying}
                    isShowIcon={true}
                    clickAlbumCoverHandler={() => { props.changePlayingToggle(); }}></SongExposition>
                <div className="right-form">
                    <img src={crossIcon} title="remove from Next Up"></img>
                    <img src={heartBlackIcon} title="Like"></img>
                    <div>2:42</div>
                </div>
            </div>
        }

        return <div className="track-item">
            <SongExposition artistName={track.artist} songName={track.name} albumCoverImage={track.imageUrl} playIconImage={play2Icon}
                pauseIconImage={pause2Icon} isShowIcon={false} isShowPlayOnHover={true}
                clickAlbumCoverHandler={() => { props.changeSong(track); props.changeIsPlayingState(true); props.changePlaylistCounter(trackIndexInPlaylist); }}></SongExposition>
            <div className="right-form">
                <img src={crossIcon} title="remove from Next Up"></img>
                <img src={heartBlackIcon} title="Like"></img>
                <div>2:42</div>
            </div>
        </div>
    }

    useEffect(() => {
        setTracklist(props.store.playlist.tracks);
    }, [props.store.playlist]);

    useEffect(() => {
        setcurrentTrack(props.store.currentSong);
    }, [props.store.currentSong]);
    useEffect(() => {
        setisPlaying(props.store.isPlaying);
    }, [props.store.isPlaying]);


    function playlistIconClickHandler() {
        let el = document.getElementsByClassName("playlist-list-container")[0];
        removeClass(' animated-show', el);
        removeClass(' animated-hide', el);
        if (isShow) {
            el.className += " animated-hide";
            setisShow(false);
        }
        else {
            el.className += " animated-show";
            setisShow(true);
        }
    }
    return (
        <div className="playlist-container" >
            {/* <img src={playlistIcon} onMouseEnter={() => playlistIconToggle()} onMouseLeave={() => playlistIconToggle()} onClick={() => playlistIconClickHandler()}></img> */}
            <PlaylistIcon clickHandler={() => playlistIconClickHandler()}></PlaylistIcon>
            <div className="playlist-list-container">
                <div className="header">
                    <div className="top-title">Next Up</div>
                    <div className="clear-button-container">
                        <button>Clear</button>
                    </div>
                    <div className="exit-button-container" onClick={playlistIconClickHandler}>
                        <img src={crossIcon}></img>
                    </div>
                </div>
                <div className="track-list">
                    {/* <ReactReduxContext.Consumer>
                        {({ store }) => { playlistUpdater(props.store.playlist.tracks, store.getState().playlistCounter, store.getState().isPlaying) }}
                    </ReactReduxContext.Consumer>
                    {tracklist} */}
                    {console.log("SOME UPDATES")}
                    {tracklist.map((track, index) => {
                        return trackRenderer(track, currentTrack, index);
                    })}
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
        changePlaylistCounter: (value) => {
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
)(Playlist);

