import React from 'react';





function Registration(props) {
    return (<div className="registration">
        <div className="reg-form">
            <div className="reg-form-container">
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


export default Registration;
