import React, { useState, useRef } from 'react';
import {connect} from 'react-redux';
import crossIcon from './../bottomPlayer/icons/cross.png';

import './scss/Registration.scss';


function Registration(props) {
    const [isShow, setisShow] = useState(true);
    const regElement = useRef(null)

    function clickOutOfFormHandler(event) {
        if (event.target.className === regElement.current.className) {
            props.changeIsShowState({isShow: false});
            // regElement.current.style.display = "none";
        }

    }
    function clickButtonExitHandler() {
        // regElement.current.style.display = "none";
        props.changeIsShowState({isShow: false});
    }

    return (<div className="registration" ref={regElement} onClick={clickOutOfFormHandler}>
        <div className="exit-button" onClick={clickButtonExitHandler}>
            <img src={crossIcon}></img>
        </div>
        <div className="reg-form">
            <div className="reg-form-container">
                <div className="title">Registration</div>
                <label for="email-input">
                    <input type="text" name="email-input" placeholder="Enter your email address" autoComplete="off"></input>
                </label>
                <button>Continue</button>
                <div className="helper">
                    <span>Need help?</span>
                </div>
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
            dispatch({type: 'SET_IS_SHOW_REGISTRATION_FORM', payload: value})
        }
    })
)(Registration);