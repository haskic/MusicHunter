import React,{useState,useEffect} from 'react';

import './../scss/SongExposition.scss';


function SongExposition(props) {
    const [isPlaying, setIsPlaying] = useState(props.isPlaying);
    useEffect(() => {
        console.log("iSPLAYING ",isPlaying)
        setIsPlaying(props.isPlaying);
    },[props.isPlaying])
    function clickAlbumCover(){
        
        if (isPlaying){
            setIsPlaying(false);
        }
        else{
            
            setIsPlaying(true);
        }
        if (props.clickAlbumCoverHandler != undefined){
            props.clickAlbumCoverHandler();
            
        }
        
    }
    return (
        <div className="song-exposition-container">
            <div className="song-exposition-image" onClick={() => clickAlbumCover()}>
                <img src={props.albumCoverImage} height="30px" width="30px"></img>
                {props.isShowPlayOnHover ? <img src={props.playIconImage} className="play-image"></img>: null}
                {props.isShowIcon ? isPlaying ? <img src={props.pauseIconImage} className="play-image" style={{display: "flex"}}></img>:<img src={props.playIconImage} className="play-image" style={{display: "flex"}}></img>: null}
            </div>
            <div className="song-exposition-container-data">
                <div className="song-exposition-container-song-name">
                    {props.songName}
                </div>
                <div className="song-exposition-container-artist">
                    {props.artistName}
                </div>
            </div>
        </div>
    );
}


export default SongExposition;