import React from 'react';
import { ReactReduxContext,connect } from 'react-redux';
import SignalRContext from '../NotificationsContext';
import defaultCover from './../AlbumCover.jpeg';
import song2 from './../shakira.mp3';
import song3 from './../lose.mp3';

let default_tracklist2 = [{ name: "Waka Waka Waka", artist: "Shakira", albumCoverImage: defaultCover, src: song2 }
, { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 }
, { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 }
, { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 }
, { name: "Lose Yourself", artist: "Eminem", albumCoverImage: defaultCover, src: song3 }
, { name: "Waka Waka Waka", artist: "Shakira", albumCoverImage: defaultCover, src: song2 }];


function Table(props){
    function handlezhakar() {
        props.changeIslogin("BOING");
        props.changePlaylist(default_tracklist2);

        SignalRContext.name = "Lox";
        console.log("VALUE  = ",SignalRContext.name);
    }
    return(
        <ReactReduxContext.Consumer>
        {({ store }) => 
        <React.Fragment>
<div>ZHAKAR {store.getState().isLogin}</div>
          <button onClick={handlezhakar}>Click me pls</button>
        </React.Fragment>
          
        }
      </ReactReduxContext.Consumer>
    );
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        changeIslogin: (value) => {
            dispatch({type: 'ZHAKAR', isLogin: value})
        },
        changePlaylist: (value) => {
            dispatch({type: 'SET_PLAYLIST', tracklist: value})
        },
    })
)(Table);