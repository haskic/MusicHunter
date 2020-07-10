import React from 'react'

import './../scss/MessageMember.scss';
export default function MessageMember(props) {
    return (
        <div className="message-member">
            <div className="photo-info">
                <div className="photo-container">
                    <img src={props.member.photo}></img>
                </div>
                <div className="member-info-container">
                    <div className="info-name">{props.member.name}</div>
                    <div className="last-message">last message</div>
                </div>
            </div>
            <div className="time-container">
                12:52
            </div>
        </div>
    )
}
