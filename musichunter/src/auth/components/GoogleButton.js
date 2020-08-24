
import React from 'react';
import GoogleLogin from 'react-google-login';
import googleIcon from './../icons/google.png';
import googleAPI from './../../API/googleAPI';


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



function GoogleButton(props) {
    return (<React.Fragment>
        <GoogleLogin
            clientId={googleAPI.clientId}
            render={renderProps => (
                <button onClick={renderProps.onClick} style={googleButtonStyle} disabled={renderProps.disabled}><img style={googleButtonStyle.img} src={googleIcon}></img> Sign In with Google</button>
            )}
            buttonText="Login"
            onSuccess={(response) => { if (props.onSuccess) { props.onSuccess(response) } }}
            onFailure={(response) => { if (props.onFaulure) { props.onFailure(response) } }}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    </React.Fragment>);
}


export default GoogleButton;