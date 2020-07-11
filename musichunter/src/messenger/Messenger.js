import React from 'react';

import LeftMenu from './leftMenu/LeftMenu';
import MessageContainer from './messageContainer/MessageContainer';

import './scss/Messenger.scss';


function Messenger() {
    return (<div className="messenger">
        <div className="messenger-container">
            <LeftMenu></LeftMenu>
            <MessageContainer></MessageContainer>
        </div>
    </div>)
}



export default Messenger;