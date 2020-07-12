import React,{useState} from 'react';

import LeftMenu from './leftMenu/LeftMenu';
import MessageContainer from './messageContainer/MessageContainer';
import MessengerContext from './messengerContext/MessengerContext';

import './scss/Messenger.scss';


function Messenger() {
const [Context, setContext] = useState({messages: null, name: null, activeMember: null});
    return (<div className="messenger">
        <div className="messenger-container">
            <MessengerContext.Provider value={[Context,setContext]}>
                <LeftMenu></LeftMenu>
                <MessageContainer></MessageContainer>
            </MessengerContext.Provider>
        </div>
    </div>)
}



export default Messenger;