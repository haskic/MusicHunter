import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import crossIcon from './../../bottomPlayer/icons/cross.png';
import './scss/Registration.scss';
import PasswordForm from '../passwordForm/PasswordForm';
import Success from '../../events/success/Success';
import API from './../api/api';

import token from './../../testData/token';

import GoogleButton from '../components/GoogleButton';
import InfoReceiver from './components/InfoReceiver';

const successAttachmentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    button: {
        height: '40px',
        width: '100%'
    }
}

function successAttachment(handler) {
    const element = <div style={successAttachmentStyle}>
        <button style={successAttachmentStyle.button} onClick={handler}>Login Now</button>
    </div>
    return element;
}

function Registration(props) {
    const [isShowPasswordForm, setisShowPasswordForm] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const [isShowInfoReceiver, setisShowInfoReceiver] = useState(false);
    const [isShowEmailInputForm, setIsShowEmailInputForm] = useState(true);
    const [userData, setUserData] = useState({});
    const regElement = useRef(null);
    const emailInput = useRef(null);

    function successNextHanlder() {
        props.changeIsShowState({ isShow: false });
        props.changeIsShowLoginState({ isShow: true });

    }
    function clickOutOfFormHandler(event) {
        if (event.target.className === regElement.current.className) {
            props.changeIsShowState({ isShow: false });
        }

    }
    function clickButtonExitHandler() {
        props.changeIsShowState({ isShow: false });
    }

    function clickContinueButtonHandler() {
        setUserData(Object.assign(userData, { email: emailInput.current.value }));
        setIsShowEmailInputForm(false);
        setisShowPasswordForm(true);
    }
    function passwordNextHandler(password) {
        setUserData({ ...userData, ...{ password: password } });
        setisShowPasswordForm(false);
        setisShowInfoReceiver(true);
    }
    function infoReceiverSuccessHandler(infoObj) {
        setUserData({ ...userData, ...{ name: infoObj.name,lastname: infoObj.lastname } });
        API.regisration(userData,token,() => {
            setisShowInfoReceiver(false);
            setisSuccess(true)  ;
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
    return (<div className="registration" ref={regElement} onClick={clickOutOfFormHandler}>
        <div className="exit-button" onClick={clickButtonExitHandler}>
            <img src={crossIcon}></img>
        </div>
        <div className="reg-form">
            <div className="reg-form-container">
                {isShowPasswordForm ? <PasswordForm title="Create your Music Hunter account" userData={userData} nextHandler={passwordNextHandler}></PasswordForm> :
                    <React.Fragment>
                        {isSuccess ? <Success title="Success" text="Now you can login at platform!" attachment={() => successAttachment(successNextHanlder)}></Success> : null}
                        {isShowInfoReceiver ? <InfoReceiver onSuccess={infoReceiverSuccessHandler}></InfoReceiver> : null}
                        {isShowEmailInputForm ? <React.Fragment>
                            <div className="title">Registration</div>
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
                            <GoogleButton onSuccess={responseGoogle} onFailure={responseGoogle}></GoogleButton>
                        </React.Fragment> : null}
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
            dispatch({ type: 'SET_IS_SHOW_REGISTRATION_FORM', payload: value })
        },
        changeIsShowLoginState: (value) => {
            dispatch({ type: 'SET_IS_SHOW_LOGIN_FORM', payload: value })
        },
        setLoginState: (value) => {
            dispatch({ type: 'LOGIN_USER', payload: value })
        }
    })
)(Registration);