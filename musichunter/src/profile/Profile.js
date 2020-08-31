import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './scss/Profile.scss';

import default_image from './default_profile_image.jpg';
import TrackViewer from './sections/trackViewer/TracksViewer';
import AlbumViewer from './sections/albumViewer/AlbumViewer';



function Profile(props) {
    let { path, url } = useRouteMatch();
    return (<div className="profile">
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-image">
                    <img src={default_image}></img>
                </div>
                <div className="user-data">
                    <div>{props.store.currentUser?.name}</div>
                    <div>Los Angeles</div>
                </div>
            </div>
            <div className="profile-sections">
                <div className="sections">
                    <div><Link to={`${path}/all`}>All</Link></div>
                    <div><Link to={`${path}/tracks`}>My tracks</Link></div>
                    <div><Link to={`${path}/albums`}>My albums</Link></div>
                    <div><Link to={`${path}/playlists`}>Playlists</Link></div>
                    <div><Link to={`${path}/reposts`}>Reposts</Link></div>
                </div>
                <div className="section-buttons">
                    <button>Share</button>
                    <button>Edit</button>
                </div>
            </div>
            <div className="content-data">
                <Switch>
                    <Route path={`${path}/all`} component={() => <div>ALexander</div>}></Route>
                    <Route path={`${path}/tracks`} component={TrackViewer}></Route>
                    <Route path={`${path}/albums`} component={AlbumViewer}></Route>
                    <Route path="/" component={() => <div>DEfault</div>}></Route>
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