import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './scss/Profile.scss';

import default_image from './default_profile_image.jpg';
import TrackViewer from './sections/trackViewer/TracksViewer';
import AlbumViewer from './sections/albumViewer/AlbumViewer';



function Profile(props) {
    const [path, setPath] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    function editButtonHandler() {
        setIsEditMode(true);
    }
    function saveButtonHandler() {
        setIsEditMode(false);

    }
    useEffect(() => {
        console.log("Profile renderer");
        setPath(props.location.pathname);
    }, [])
    useEffect(() => {
        let nameElement = document.getElementById("user-name-info");
        let locationElement = document.getElementById("user-location-info");

        if (isEditMode) {
            nameElement.setAttribute("contenteditable", true);
            locationElement.setAttribute("contenteditable", true);
            locationElement.style.background = "black";
            nameElement.style.background = "black";
        }
        else {
            nameElement.setAttribute("contenteditable", false);
            locationElement.setAttribute("contenteditable", false);
            locationElement.style.background = "rgba(0,0,0,0)";
            nameElement.style.background = "rgba(0,0,0,0)";
        }

    }, [isEditMode])

    return (<div className="profile">
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-image">
                    <img src={default_image}></img>
                </div>
                <div className="user-data">
                    <div id="user-name-info">{props.store.currentUser?.name}</div>
                    <div id="user-location-info">Los Angeles</div>
                </div>
            </div>
            <div className="profile-sections">
                <div className="sections">
                    <div><Link to={path + '/all'}>All</Link></div>
                    <div><Link to={path + '/tracks'}>My tracks</Link></div>
                    <div><Link to={path + '/albums'}>My albums</Link></div>
                    <div><Link to={path + '/playlists'}>Playlists</Link></div>
                    <div><Link to={path + '/reposts'}>Reposts</Link></div>
                </div>
                <div className="section-buttons">
                    <button>Share</button>

                    {isEditMode ? <button style={{ background: 'green' }} onClick={saveButtonHandler}>Save</button> : <button onClick={editButtonHandler}>Edit</button>}
                </div>
            </div>
            <div className="content-data">
                <Switch>
                    <Route path={`/profile/:userhash/all`} component={() => <div>ALexander</div>}></Route>
                    <Route path={`/profile/:userhash/tracks`} render={(properties) => <TrackViewer {...properties} userHash={props.store.currentUser.hash}></TrackViewer>}></Route>
                    {/* <Route path={`tracks`} component={TrackViewer}></Route> */}
                    <Route path={`/profile/:userhash/albums`} component={AlbumViewer}></Route>
                    <Route path={`/profile/:userhash/`} component={() => <div>DEfault</div>}></Route>
                </Switch>
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
        changeIsPlayingState: (value) => {
            dispatch({ type: 'SET_PLAYING_STATE', isPlaying: value })
        },

    })
)(Profile);