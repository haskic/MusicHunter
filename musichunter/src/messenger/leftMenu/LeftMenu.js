import React from 'react';
import MessageMemberContainer from '../messageMemberContainer/MessageMemberContainer';

import testImage from './techN9neImage.jpg';

import './../scss/LeftMenu.scss';

const testMembers = [
    {
        name: 'Tech N9ne',
        photo: testImage,
    },
    {
        name: 'Oxxymiron',
        photo: testImage,
    }
]


function LeftMenu() {
    return (<div className="left-menu">
        <div className="left-menu-container">
            <div className="section-title">
                Messages
            </div>
            <div className="member-search">
                <input type="text" placeholder="Search "></input>
            </div>
            <MessageMemberContainer members={testMembers}></MessageMemberContainer>
        </div>
    </div>)

}

export default LeftMenu;