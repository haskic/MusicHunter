import React, { useContext, useState, useRef, useEffect } from 'react';
import Message from './../message/Message';

import MessengerContext from './../messengerContext/MessengerContext';

import './../scss/MessageContainer.scss';
import default_image from './../leftMenu/techN9neImage.jpg';

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
]

export default function MessageContainer(props) {
    const [context, setContext] = useContext(MessengerContext);
    const [textInput, setTextInput] = useState("");
    const messageContainerElement = useRef(null);

    useEffect(() => {
        messageContainerElement.current.scrollTop = messageContainerElement.current.scrollHeight;
    }, [context])

    function keyDownInputHandlder(e){
        if (e.key === 'Enter') {
            e.preventDefault();
            sendButtonHandler();
          }
    }
    function messageTextOnChange(e) {
        if (e.target.value.length <= 255) {
            setTextInput(e.target.value);
        }
    }
    function sendButtonHandler() {
        props.sendMessage(textInput, context.activeMember.hash);
        setTextInput("");
        console.log("Scroll element = ",messageContainerElement.current);
        console.log("MAX",messageContainerElement.current.scrollHeight);
    }
    return (
        <div className="messages-main">
            <div className="recipient-container">
                <div className="left-options">
                    <div className="recipient-name">
                        {context.name}
                    </div>
                    <button>Block</button>
                    <button>Report</button>
                </div>
                <div className="right-options">
                    <button>Delete history</button>
                </div>
            </div>
            <div className="message-container" ref={messageContainerElement}>
                {context.messages && context.messages.map((message) => {
                    return <Message message={message} photo={default_image}></Message>
                })}
            </div>
            <div className="message-sender">
                <div className="message-sender-header">
                    Write your message and add tracks
                </div>
                <textarea id="message-sender" value={textInput} onChange={(e) => messageTextOnChange(e)} onKeyDown={(e) => keyDownInputHandlder(e)}>
                </textarea>
                <div className="message-sender-footer">
                    <div className="left-options">
                        <button>Add track</button>
                    </div>
                    <div className="right-options">
                        <button id="send-button" onClick={sendButtonHandler}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
