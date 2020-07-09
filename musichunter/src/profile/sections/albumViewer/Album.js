import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import playIcon from  './../../../bottomPlayer/icons/play.png';
import pauseIcon from  './../../../bottomPlayer/icons/pause.png';

import TrackDiagram from  './../trackViewer/TrackDiagram';

import './scss/Album.scss';
import TrackList from './TrackList';

function Album(props) {
    const [isPlaying, setisPlaying] = useState(false);
    const [currentTrack, setcurrentTrack] = useState({hash: ""});
    function controlClickHandler() {
        if (isPlaying) {
            props.changeIsPlayingState(false);
            setisPlaying(false);
        }
        else {
            // if (props.store.playlist.hash !== props.album.hash) {
            //     let mypromise = new Promise((resolve, reject) => {
            //         props.changeSong({ src: "" });
            //         resolve();
            //     });
            //     mypromise.then(() => {
            //         props.changeSong(props.track);
            //     })
            // }
            if (props.store.playlist.hash !== props.album.hash){
                props.changePlaylist(props.album);
                setcurrentTrack(props.album.tracklist[0]);
            }
            props.changeIsPlayingState(true);
            setisPlaying(true);
        }
    }
    useEffect(() => {
        if (props.store.playlist.hash == props.album.hash) {
            if (props.store.isPlaying) {
                setisPlaying(true);
            }
            else {
                setisPlaying(false);
            }
        }
        else {
            setisPlaying(false);
        }
    }, [props.store.currentSong, props.store.isPlaying]);
    useEffect(() => {
        if (props.album.hash == props.store.playlist.hash){
            setcurrentTrack(props.store.currentSong);
        }
        
    }, [props.store.currentSong])
    // useEffect(() => {

    //     return () => {
    //         console.log("TRACK UNMOUNT");
    //     }
    // }, [])

    
    return (<div className="album-container">
        <div className="album-cover">
            <img src={props.album.coverImage}></img>
        </div>
        <div className="album-data">
            <div className="album-control-info">
                <div className="album-control" onClick={controlClickHandler}>
                    {isPlaying ? <img src={pauseIcon}></img> : <img src={playIcon}></img>}
                </div>
                <div className="album-info">
                    <div className="album-artist">{props.album.artist}</div>
                    <div className="album-name">{props.album.name}</div>
                </div>
            </div>
            <TrackDiagram hash={currentTrack.hash}></TrackDiagram>
            <TrackList tracklist={props.album.tracklist} currentTrack={currentTrack}></TrackList>
            <div className="album-options">
                <button>Like</button>
                <button>Reposts</button>
                <button>Share</button>
            </div>
        </div>
    </div>);

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
        changePlaylist: (value) => {
            dispatch({ type: 'SET_PLAYLIST_AND_PLAY', playlist: value })
        }
    })
)(Album);