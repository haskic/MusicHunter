import React from 'react';
import AlbumTrack from './AlbumTrack';

import './scss/TrackList.scss';
function TrackList(props) {

    return (<div className="tracklist">
        {props.tracklist.map((value, index) => {
            if (value.hash == props.currentTrack.hash){
                return <AlbumTrack track={value} number={index + 1} current={true}/>
            }
            else{
                return <AlbumTrack track={value} number={index + 1} />
            }
        })}
    </div>)
}


export default TrackList;