import React from 'react'
import MessageMember from './../messageMember/MessageMember';

import './../scss/MessageMemberContainer.scss';
export default function MessageMemberContainer(props) {
    return (
        <div className="message-member-container">
            {props.members.map((value) => {
                return <MessageMember member={value}></MessageMember>
            })}
        </div>
    )
}
