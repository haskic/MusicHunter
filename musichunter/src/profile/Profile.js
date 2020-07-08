import React from 'react';
import {Switch,Route,useRouteMatch,Link} from 'react-router-dom';
import './scss/Profile.scss';

import default_image from './default_profile_image.jpg';
import TrackViewer from './sections/trackViewer/TracksViewer';
import AlbumViewer from './sections/albumViewer/AlbumViewer';



function Profile() {
    let { path, url } = useRouteMatch();
    return (<div className="profile">
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-image">
                    <img src={default_image}></img>
                </div>
                <div className="user-data">
                    <div>Name LastName</div>
                    <div>Los Angeles</div>
                </div>
            </div>
            <div className="profile-sections">
                <div className="sections">
                    <div><Link to={`${path}/all`}>All</Link></div>
                    <div><Link to={`${path}/tracks`}>My tracks</Link></div>
                    <div><Link to={`${path}/albums`}>My albums</Link></div>
                    <div><Link to={`${path}/playlists`}>Playlists</Link></div>
                    <div><Link to={`${path}/reposts`}>Reposts</Link></div>
                </div>
                <div className="section-buttons">
                    <button>Share</button>
                    <button>Edit</button>
                </div>
            </div>
            <div className="content-data">
                <Switch>
                    <Route path={`${path}/all`} component={() => <div>ALexander</div>}></Route>
                    <Route path={`${path}/tracks`} component={TrackViewer}></Route>
                    <Route path={`${path}/albums`} component={AlbumViewer}></Route>
                    <Route path="/" component={() => <div>DEfault</div>}></Route>
                </Switch>
            </div>
        </div>
    </div>);

}


export default Profile;