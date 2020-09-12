import React from 'react';
import playIcon from './../../../bottomPlayer/icons/play.png';
import './scss/AlbumTrack.scss';

function AlbumTrack(props) {

    return (<div className="track-item">
        <div className="left-side" style={props.current? {color: 'blue'}: null}>
            <img src={props.track.imageUrl}></img>
            {props.number}
            <span>{props.track.name}</span>
        </div>
        <div className="right-side"><img src={playIcon}></img><div>{props.track.listens}</div></div>
    </div>);
}


export default AlbumTrack;