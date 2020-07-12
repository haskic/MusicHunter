import React, { useContext } from 'react'

import MessengerContext from './../messengerContext/MessengerContext';
import './../scss/MessageMember.scss';

export default function MessageMember(props) {
    const [context, setContext] = useContext(MessengerContext);


    function memberClickHandler() {
        setContext({ messages: props.member.messages, name: props.member.name, activeMember: props.index });
    }

    return (
        <div className="message-member" onClick={memberClickHandler}
            style={{
                backgroundColor: props.index === context.activeMember ? 'rgb(239,239,239)' : 'white',
                borderLeft: props.index === context.activeMember ? '2px solid rgb(0,0,240)' : 'none'
            }}>
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
