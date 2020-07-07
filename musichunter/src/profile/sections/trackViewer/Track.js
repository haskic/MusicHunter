import React from 'react';
import playIcon from './../../../bottomPlayer/icons/play.png';
import pauseIcon from './../../../bottomPlayer/icons/pause2.png';

import './scss/Track.scss';


function Track(props) {

    return (<div className="track-container">
        <div className="album-cover">
            <img src={props.track.coverImage}></img>
        </div>
        <div className="track-data">
            <div className="track-control-info">
                <div className="track-control"><img src={playIcon}></img></div>
                <div className="track-info">
                    <div className="track-artist">{props.track.artist}</div>
                    <div className="track-name">{props.track.name}</div>
                </div>
            </div>
            <div className="track-options">
                <button>Like</button>
                <button>Reposts</button>
                <button>Share</button>
            </div>
        </div>

    </div>)

}

export default Track;