import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import crossIcon from './../../bottomPlayer/icons/cross.png';
import googleIcon from './../icons/google.png';
import './scss/Registration.scss';
import PasswordForm from '../passwordForm/PasswordForm';
import Success from '../../events/success/Success';

import googleAPI from './../../API/googleAPI';


const successAttachmentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    button: {
        height: '40px',
        width: '100%'
    }
}
const googleButtonStyle = {
    display: 'flex',
    backgroundColor: 'white',
    border: '1px solid black',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    img: {
        height: '25px',
        width: '25px',
        marginRight: '10px'

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
            setisShowPasswordForm(false);
            setisSuccess(true);
        }
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
                        {isSuccess ?
                            <Success title="Success" text="Now you can login at platform!" attachment={() => successAttachment(successNextHanlder)}></Success> :
                            <React.Fragment>
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
                                <GoogleLogin
                                    clientId={googleAPI.clientId}
                                    render={renderProps => (
                                        <button onClick={renderProps.onClick} style={googleButtonStyle} disabled={renderProps.disabled}><img style={googleButtonStyle.img} src={googleIcon}></img> Sign In with Google</button>
                                    )}
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}
                                />
                            </React.Fragment>}
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
            dispatch({type: 'LOGIN_USER', payload: value})
        }
    })
)(Registration);