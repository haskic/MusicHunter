import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';


import Notifications from './Notifications';
import './scss/TopMenu.scss';

import envelopeLogo from './logo/envelope.png';
import mainLogo from './logo/musicHunterLogo4.png';

import NotificationsContext from '../NotificationsContext';

function TopMenu(props) {
    return (
        <div className="top-menu">
            <div className="top-menu-container">
                <div className="top-menu-container-logo">
                    <img src={mainLogo}></img>
                </div>
                {/* <NotificationsContext.Consumer>
                    {value => <div>{value.name}</div>}
                </NotificationsContext.Consumer> */}
                <div className="top-menu-container-home"><Link to="/home">Home</Link></div>
                <div className="top-menu-container-library">Library</div>
                <div className="top-menu-container-search">
                    <input type="text" placeholder="Search"></input>
                </div>
                <div className="login-button">
                    <button>Sign In</button>
                </div>
                <div className="registration-button">
                    <button>Create account</button>
                </div>
                <div className="top-menu-container-upload">
                    {/* {NotificationsContext.name} */}
                    <Link to="/upload">Upload</Link>
                </div>

                {/* <div className="top-menu-container-profile-button"><Link to="/profile">Alexander Speek</Link></div>

                <Notifications></Notifications>
                <div className="top-menu-container-messages"><Link to="/messenger"><img src={envelopeLogo}></img></Link> </div> */}
                {/* <button onClick={() => {console.log("VALUE = ",NotificationsContext.name)}}>click</button> */}
            </div>
        </div>
    );
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
        changeSong: (value) => {
            dispatch({ type: 'SET_SONG', song: value })
        },
    })
)(TopMenu);