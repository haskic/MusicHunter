import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import HomePage from '../home/HomePage';
import Uploader from './../upload/Uploader';
import Messenger from './../messenger/Messenger';
import SearchViewer from './../search/SearchViewer/SearchViewer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from '../profile/Profile';

import './scss/CenterContainer.scss';


import googleAPI from './../API/googleAPI';
import googleIcon from './../auth/icons/google.png';
import GoogleLogin from 'react-google-login';
import IsLoginChecker from '../auth/isLoginChecker/IsLoginChecker';


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


function CenterContainer(props) {
    useEffect(() => {

    }, [])

    const [isLogin, setIsLogin] = useState(false);
    function onSuccessAutoLogin() {
        setIsLogin(true);
    }
    return (<div className='center-container'>
        {isLogin ? <Switch>
            <Route path="/profile/:userHash" component={Profile}></Route>
            <Route path="/home" component={HomePage}></Route>
            <Route path="/upload" component={Uploader}></Route>
            <Route path="/messenger" component={Messenger}></Route>
            <Route path="/search" render={(properties) => <SearchViewer {...properties}></SearchViewer>}></Route>
            <Route path="/" component={HomePage}></Route>

        </Switch> : null}
        <IsLoginChecker onSuccessLogin={() => onSuccessAutoLogin()}></IsLoginChecker>
    </div>);
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
            dispatch({ type: 'SET_IS_SHOW_LOGIN_FORM', payload: value })
        },
        setLoginState: (value) => {
            dispatch({ type: 'LOGIN_USER', payload: value })
        }
    })
)(CenterContainer);