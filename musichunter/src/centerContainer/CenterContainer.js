import React from 'react';
import HomePage from '../home/HomePage';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from '../profile/Profile';
import './scss/CenterContainer.scss';
function CenterContainer() {



    return (<div className='center-container'>
        <Router>
            <Switch>
                <Route path="/profile">
                    <Profile></Profile>
                </Route>
                <Route path="/">
                    <HomePage></HomePage>
                </Route>

            </Switch>
        </Router>


    </div>);
}


export default CenterContainer;