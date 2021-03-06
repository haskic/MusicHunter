import React from 'react';
import AlbumTrack from './AlbumTrack';

import './scss/TrackList.scss';
function TrackList(props) {

    return (<div className="tracklist">
        {props.tracklist.map((value, index) => {
            if (value.hashUrl == props.currentTrack.hashUrl){
                return <AlbumTrack track={value} number={index + 1} current={true} setTrack={props.setTrack}/>
            }
            else{
                return <AlbumTrack track={value} number={index + 1} current={false} setTrack={props.setTrack}/>
            }
        })}
    </div>)
}


export default TrackList;