import React from 'react';

import './PasswordForm.scss';


function PasswordForm(props){

    return(<div className="password-form">
        <div className="title">Create your MusicHunter account</div>
        <label for="email-input">
            <input type="text" name="email-input"></input>
        </label>
        <label for="password-input">Choose a password
            <input type="password" name="password-input"></input>
        </label>
        <button>Accept &#38; continue</button>
    </div>)
}


export default PasswordForm;