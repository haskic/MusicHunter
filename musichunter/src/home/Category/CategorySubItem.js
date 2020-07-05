import React, { useState, useEffect } from 'react';
import { ReactReduxContext, connect } from 'react-redux';

import playIcon from './../../bottomPlayer/icons/play2.png';
import pauseIcon from './../../bottomPlayer/icons/pause2.png';
import heartIcon from './../../bottomPlayer/icons/heartBlue.png';


const defaultStyle = {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
}
const heartDefaultStyle = {
    position: 'absolute',
    right: '5px',
    bottom: '10px',
    width: '17px',
    height: '17px'
}

function CategorySubItem(props) {

    const [isHover, setisHover] = useState(false);
    const [isPlaying, setisPlaying] = useState(false);
    useEffect(() => {
        if (props.store.playlist.hash === props.playlist.hash){
            setisPlaying(props.store.isPlaying);
        }
        else{
            setisPlaying(false);
        }
    }, [props.store.playlist,props.store.isPlaying]);
    function mouseEnterHander() {
        setisHover(true);
    }
    function mouseLeaveHandler() {
        setisHover(false);
    }
    function pauseClickHandler(){
        props.changeIsPlayingState(false);
        setisPlaying(false);
    }
    function playClickHandler() {
        console.log("PLAYLIST = ", props.playlist);
        props.changePlaylist(props.playlist);
        setisPlaying(true);
    }
    return (<div className="category-carusel-item">
        <div className="category-carusel-item-album-cover" onMouseEnter={mouseEnterHander} onMouseLeave={mouseLeaveHandler}>
            <img src={props.albumCover}></img>
            {isHover ? <React.Fragment>
                {isPlaying ? <img style={defaultStyle} src={pauseIcon} onClick={pauseClickHandler}></img> :
                    <img style={defaultStyle} src={playIcon} onClick={playClickHandler}></img>}


                <img src={heartIcon} style={heartDefaultStyle}></img>
            </React.Fragment> : null}
        </div>
        <div className="category-carusel-item-title">{props.title}</div>
        <div className="category-carusel-item-description">{props.description}</div>
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
            dispatch({ type: 'SET_SONG', songUrl: value })
        },
        changeIsPlayingState: (value) => {
            dispatch({ type: 'SET_PLAYING_STATE', isPlaying: value })
        },
        changePlaylist: (value) => {
            dispatch({ type: 'SET_PLAYLIST_AND_PLAY', playlist: value })
        }
    })
)(CategorySubItem);

