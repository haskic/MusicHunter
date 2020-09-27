import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import crossIcon from './../../bottomPlayer/icons/cross.png';

import './scss/Login.scss';
import PasswordForm from '../passwordForm/PasswordForm';
import GoogleButton from '../components/GoogleButton';
import api from '../api/api';
import Error from '../../events/error/Error';

function Login(props) {

    const loginElement = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const [isShowPasswordForm, setisShowPasswordForm] = useState(false);
    const [userData, setUserData] = useState({});

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
        if (!isShowPasswordForm){
            setUserData(Object.assign(userData, { email: emailInput.current.value }));
            setisShowPasswordForm(true);
            return;
        }     
        setUserData(Object.assign(userData, { password: passwordInput.current.value }));
        api.login(userData, (res) => {
            console.log("Response ", res.data);
            if (!res.data.status) {

            }
            let userObj = JSON.parse(res.data.user);
            props.setLoginState({ ...userObj, ...{ token: res.data.token } });
            props.changeIsShowState({ isShow: false });
            console.log("Login success");
        });
    }

    function passwordNextHandler(password) {

        api.login({ email: userData.email, password: password }, (res) => {
            console.log("Response ", res.data);
            if (!res.data.status) {

            }
            let userObj = JSON.parse(res.data.user);
            props.setLoginState({ ...userObj, ...{ token: res.data.token } });
            props.changeIsShowState({ isShow: false });

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

                <React.Fragment>
                    <div className="title">Login</div>

                    <label for="email-input">
                        <input type="text" name="email-input" placeholder="Email" autoComplete="off" ref={emailInput}></input>
                    </label>
                    {isShowPasswordForm ? <label for="password-input">
                        <input type="password" name="password-input" placeholder="Password" autoComplete="off" ref={passwordInput}></input>
                    </label> : null}
                    <Error message={"Alexader"}></Error>
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