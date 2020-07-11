import React from 'react'

import './../scss/Message.scss';

export default function Message(props) {
    return (
        <div className={props.message.sender === 'Me'? 'message': 'message message-not-me'}>
            <div className="photo-container">
                <img src={props.photo}></img>
            </div>
            <div className="message-info">
                <div className="sender-info">{props.message.sender}</div>
                <div className="message-text">{props.message.text}</div>
            </div>
            <div className="message-time">
                {props.message.time}
            </div>
        </div>
    )
}
