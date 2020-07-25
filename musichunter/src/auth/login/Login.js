import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import crossIcon from './../../bottomPlayer/icons/cross.png';

import './scss/Login.scss';
import PasswordForm from '../passwordForm/PasswordForm';

function Login(props) {

    const loginElement = useRef(null);
    const emailInput = useRef(null);

    const [isShowPasswordForm, setisShowPasswordForm] = useState(false);
    const [userData, setUserData] = useState({});


    function clickOutOfFormHandler(event) {
        if (event.target.className === loginElement.current.className) {
            props.changeIsShowState({ isShow: false });
            // regElement.current.style.display = "none";
        }

    }
    function clickButtonExitHandler() {
        // regElement.current.style.display = "none";
        props.changeIsShowState({ isShow: false });
    }

    function clickContinueButtonHandler() {
        setUserData(Object.assign(userData, { email: emailInput.current.value }));

        setisShowPasswordForm(true);
    }

    function passwordNextHandler(password) {

        if (true) {
            console.log("Login success");
        }

    }

    return (<div className="login" ref={loginElement} onClick={clickOutOfFormHandler}>
        <div className="exit-button" onClick={clickButtonExitHandler}>
            <img src={crossIcon}></img>
        </div>
        <div className="login-form">
            <div className="login-form-container">
                {isShowPasswordForm ? <PasswordForm title="Login" userData={userData} nextHandler={passwordNextHandler}></PasswordForm> :
                    <React.Fragment>
                        <div className="title">Login</div>

                        <label for="email-input">
                            <input type="text" name="email-input" placeholder="Enter your email address" autoComplete="off" ref={emailInput}></input>
                        </label>
                        <button onClick={clickContinueButtonHandler}>Continue</button>
                        <div className="helper">
                            <span>Need help?</span>
                        </div>
                    </React.Fragment>
                }

            </div>
        </div>
    </div>)
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
        changeIsShowState: (value) => {
            dispatch({ type: 'SET_IS_SHOW_LOGIN_FORM', payload: value })
        }
    })
)(Login);