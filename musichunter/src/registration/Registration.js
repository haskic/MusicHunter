import React from 'react';

import crossIcon from './../bottomPlayer/icons/cross.png';

import './scss/Registration.scss';


function Registration(props) {
    return (<div className="registration">
        <div className="exit-button">
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
