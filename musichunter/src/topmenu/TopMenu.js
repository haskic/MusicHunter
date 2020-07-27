import React, { useEffect } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Registration from '../auth/registration/Registration';

import Notifications from './Notifications';
import './scss/TopMenu.scss';

import envelopeLogo from './logo/envelope.png';
import mainLogo from './logo/musicHunterLogo4.png';

import NotificationsContext from '../NotificationsContext';
import Login from '../auth/login/Login';

function TopMenu(props) {
    function regButtonClickHandler() {
        props.changeRegFormState({ isShow: true });
    }
    function loginButtonClickHandler() {
        props.changeLoginFormState({ isShow: true });
    }

    return (
        <div className="top-menu">
            {props.store.regForm?.isShow ? <Registration></Registration> : null}
            {props.store.loginForm?.isShow ? <Login></Login> : null}
            <div className="top-menu-container">
                <div className="top-menu-container-logo">
                    <img src={mainLogo}></img>
                </div>
                {/* <NotificationsContext.Consumer>
                    {value => <div>{value.name}</div>}
                </NotificationsContext.Consumer> */}
                <Link to="/home"><div className="top-menu-container-home">Home</div></Link>
                <div className="top-menu-container-library">Library</div>
                <div className="top-menu-container-search">
                    <input type="text" placeholder="Search"></input>
                </div>
                {props.store.isLogin ?
                    <React.Fragment>
                        <Link to="/profile"><div className="top-menu-container-profile-button">{props.store.currentUser.name}</div></Link>

                        <Notifications></Notifications>
                        <Link to="/messenger"><div className="top-menu-container-messages"><img src={envelopeLogo}></img></div></Link>
                    </React.Fragment>
                    : <React.Fragment>
                        <div className="login-button">
                            <button onClick={loginButtonClickHandler}>Sign In</button>
                        </div>
                        <div className="registration-button">
                            <button onClick={regButtonClickHandler}>Create account</button>
                        </div>
                    </React.Fragment>
                }


                {/* {NotificationsContext.name} */}
                <Link to="/upload"><div className="top-menu-container-upload">Upload</div></Link>



                {/* <button onClick={() => {console.log("VALUE = ",NotificationsContext.name)}}>click</button> */}
            </div>
        </div >
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
        changeRegFormState: (value) => {
            dispatch({ type: "SET_IS_SHOW_REGISTRATION_FORM", payload: value })
        },
        changeLoginFormState: (value) => {
            dispatch({ type: "SET_IS_SHOW_LOGIN_FORM", payload: value })
        },
        setLoginState: (value) => {
            dispatch({type: 'LOGIN_USER', payload: value})
        }
    })
)(TopMenu);