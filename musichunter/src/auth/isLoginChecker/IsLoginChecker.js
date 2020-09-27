import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import GoogleLogin from 'react-google-login';
import API from './../api/api';
import googleAPI from './../../API/googleAPI';
import Cookies from 'universal-cookie';

function IsLoginChecker(props) {

    function responseGoogle(response) {
        const currentUser = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            imageUrl: response.profileObj.imageUrl
        };
        console.log("Google response:", response);
        API.googleVerify({ TokenId: response.tokenId }, (res) => {
            props.setLoginState({ ...currentUser, ...{ token: res.data.token, hash: res.data.userHash } });
            // console.log("RESPONS SERVER",res);
        });
    }
    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get("default_token");
        console.log("Cookies token = ", token);
        API.defaultTokenVerify(token, (res) => {
            if (res.data.status) {
                console.log("User received",res.data.user);
                let user = JSON.parse(res.data.user);
                props.setLoginState({ ...user, ...{ token: token } });
            }
        });
    }, [])

    return (
        <React.Fragment>
            <GoogleLogin
                clientId={googleAPI.clientId}
                render={renderProps => null}
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
            dispatch({ type: 'LOGIN_USER', payload: value })
        }
    })
)(IsLoginChecker);