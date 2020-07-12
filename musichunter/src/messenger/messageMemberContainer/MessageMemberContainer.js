import React,{useState} from 'react'
import MessageMember from './../messageMember/MessageMember';

import './../scss/MessageMemberContainer.scss';






export default function MessageMemberContainer(props) {
    return (
        <div className="message-member-container">
            {props.members.map((value,index) => {
                return <MessageMember member={value} index={index} key={index}></MessageMember>
            })}
        </div>
    )
}
