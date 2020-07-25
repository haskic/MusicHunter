import React,{useRef} from 'react';

import './PasswordForm.scss';


function PasswordForm(props) {
    const passwordInput = useRef(null);

    return (<div className="password-form">
        <div className="title">{props.title}</div>
        <label for="email-input" className="user-email">
            <input type="text" name="email-input" readOnly value={props.userData.email}></input>
        </label>
        <label for="password-input">Choose a password
            <input type="password" name="password-input" ref={passwordInput}></input>
        </label>
        <button onClick={() => props.nextHandler(passwordInput.current.value)}>Accept &#38; continue</button>
    </div>)
}


export default PasswordForm;