import React from 'react';
import MessageMemberContainer from '../messageMemberContainer/MessageMemberContainer';

import testImage from './techN9neImage.jpg';

import './../scss/LeftMenu.scss';


const default_messages = [
    {
        sender: 'Me',
        to: 'Tech N9ne',
        text: "Hello man what's up",
        attachment: null,
        time: '14:52'
    },
    {
        sender: 'Me',
        to: 'Tech N9ne',
        text: "What're u doing today?",
        attachment: null,
        time: '11:52'
    },
    {
        sender: 'Tech N9ne',
        to: 'Me',
        text: "Nice music man!",
        attachment: null,
        time: '8:52'
    },
    {
        sender: 'Tech N9ne',
        to: 'Me',
        text: "Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man",
        attachment: null,
        time: '00:52'
    },
    {
        sender: 'Me',
        to: 'Tech N9ne',
        text: "Nice music man!",
        attachment: null,
        time: '8:52'
    },
    {
        sender: 'Me',
        to: 'Tech N9ne',
        text: "With love from belarus",
        attachment: null,
        time: '00:52'
    }
];
const default_messages2 = [
    {
        sender: 'Me',
        to: 'Tech N9ne',
        text: "Hello",
        attachment: null,
        time: '14:52'
    },
    {
        sender: 'Me',
        to: 'Tech N9ne',
        text: " MAN WTF What're u doing today?",
        attachment: null,
        time: '11:52'
    },
    {
        sender: 'Tech N9ne',
        to: 'Me',
        text: " MAN WTF Nice music man!",
        attachment: null,
        time: '8:52'
    },
    {
        sender: 'Tech N9ne',
        to: 'Me',
        text: " MAN WTF Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man,Thanks a lot man",
        attachment: null,
        time: '00:52'
    },
    {
        sender: 'Me',
        to: 'Tech N9ne',
        text: " MAN WTF Nice music man!",
        attachment: null,
        time: '8:52'
    },
    {
        sender: 'Me',
        to: 'Tech N9ne',
        text: " MAN WTF With love from belarus",
        attachment: null,
        time: '00:52'
    }
]

const testMembers = [
    {
        name: 'Tech N9ne',
        photo: testImage,
        messages: default_messages
    },
    {
        name: 'Oxxymiron',
        photo: testImage,
        messages: default_messages2
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