import React from 'react';

import { connect } from 'react-redux';

import GoogleLogin from 'react-google-login';

import googleAPI from './../../API/googleAPI';


function IsLoginChecker(props) {

    function responseGoogle(response) {
        const currentUser = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            imageUrl: response.profileObj.imageUrl
        };
        props.setLoginState(currentUser);
    }

    return (
        <React.Fragment>
            <GoogleLogin
                clientId={googleAPI.clientId}
                render={null}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </React.Fragment>
    )

}

export default connect(
    state => ({ store: state }),
    dispatch => ({
        
        setLoginState: (value) => {
            dispatch({type: 'LOGIN_USER', payload: value})
        }
    })
)(IsLoginChecker);