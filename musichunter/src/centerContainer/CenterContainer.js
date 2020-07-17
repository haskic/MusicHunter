import React from 'react';
import HomePage from '../home/HomePage';
import Uploader from './../upload/Uploader';
import Messenger from './../messenger/Messenger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from '../profile/Profile';

import './scss/CenterContainer.scss';

function CenterContainer() {



    return (<div className='center-container'>
        
        <Switch>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/home" component={HomePage}></Route>
            <Route path="/upload" component={Uploader}></Route>
            <Route path="/messenger" component={Messenger}></Route>
            <Route path="/" component={HomePage}></Route>
        </Switch>
    </div>);
}

export default CenterContainer;