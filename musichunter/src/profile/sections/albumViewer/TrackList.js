import React from 'react';
import AlbumTrack from './AlbumTrack';

import './scss/TrackList.scss';
function TrackList(props) {


    return (<div className="tracklist">
        {props.tracklist.map((value, index) => {
            return <AlbumTrack track={value} number={index + 1}/>
        })}
    </div>)
}


export default TrackList;