import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import crossIcon from './../../bottomPlayer/icons/cross.png';

import './scss/Login.scss';
import PasswordForm from '../passwordForm/PasswordForm';
import GoogleButton from '../components/GoogleButton';
import api from '../api/api';

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

        api.login({ email: userData.email, password: password }, (res) => {
            props.setLoginState({ ...userData, ...{ token: res.data.token, hash: res.data.userHash } });
            console.log("Login success");
        });

    }

    function responseGoogle(response) {
        console.log("Google Response ", response);
        const currentUser = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            imageUrl: response.profileObj.imageUrl
        };
        props.setLoginState(currentUser);
        props.changeIsShowState({ isShow: false });
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
                        <div className="delimiter">
                            <div></div>
                            <div className="delimiter-title">or</div>
                            <div></div>
                        </div>
                        <GoogleButton onSuccess={responseGoogle}></GoogleButton>
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
        },
        setLoginState: (value) => {
            dispatch({ type: 'LOGIN_USER', payload: value })
        }
    })
)(Login);