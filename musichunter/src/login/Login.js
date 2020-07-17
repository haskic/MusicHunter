import React from 'react';


function Login(props) {
    return (<div className="login">
        <div className="login-form">
            <div className="login-form-container">
                <label for="email-input">
                    <input type="text" name="email-input"></input>
                </label>
                <button>Continue</button>
                <div className="helper">
                    <span>Need help?</span>
                </div>
            </div>
        </div>
    </div>)
}


export default Login;