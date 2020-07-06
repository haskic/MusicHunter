import React from 'react';
import {Link, BrowserRouter as Router} from 'react-router-dom';

import Notifications from './Notifications';
import './scss/TopMenu.scss';

import envelopeLogo from './logo/envelope.png';

import NotificationsContext from '../NotificationsContext';

function TopMenu(props){
    return(
        <div className="top-menu">
            <div className="top-menu-container">
                <div className="top-menu-container-logo">
                    <img></img>
                </div>
                <NotificationsContext.Consumer>
                    {value => <div>{value.name}</div>}
                </NotificationsContext.Consumer>
                <div className="top-menu-container-home"><Link to="/home">Home</Link></div>
                <div className="top-menu-container-library">Library</div>
                <div className="top-menu-container-search">
                    <input type="text" placeholder="Search"></input>
                </div>
                <div className="top-menu-container-upload">
                    {/* {NotificationsContext.name} */}
                    Upload</div>
                
                <div className="top-menu-container-profile-button"><Link to="/profile">Alexander Speek</Link></div>

                <Notifications></Notifications>
                <div className="top-menu-container-messages"><img src={envelopeLogo}></img></div>
                {/* <button onClick={() => {console.log("VALUE = ",NotificationsContext.name)}}>click</button> */}
            </div>
        </div>
    );
}

export default TopMenu;