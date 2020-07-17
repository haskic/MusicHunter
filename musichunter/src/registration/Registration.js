import React, { useState, useRef } from 'react';

import crossIcon from './../bottomPlayer/icons/cross.png';

import './scss/Registration.scss';


function Registration(props) {
    const [isShow, setisShow] = useState(true);
    const regElement = useRef(null)

    function clickOutOfFormHandler(event) {
        if (event.target.className === regElement.current.className) {
            regElement.current.style.display = "none";
        }
    }
    function clickButtonExitHandler() {
        regElement.current.style.display = "none";
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


export default Registration;
