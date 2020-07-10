import React from 'react';

import './../scss/MessageContainer.scss';


export default function MessageContainer(props) {
    return (
        <div className="messages-main">
            <div className="recipient-container">
                <div className="left-options">
                    <div className="recipient-name">
                        oxxxymiron
                    </div>
                    <button>Block</button>
                    <button>Report</button>
                </div>
                <div className="right-options">
                    <button>Delete history</button>
                </div>
            </div>
            <div className="message-container">

            </div>
            <div className="message-sender">
                <div className="message-sender-header">
                    Write your message and add tracks
                </div>
                <textarea id="message-sender">

                </textarea>
                <div className="message-sender-footer">
                    <div className="left-options">
                        <button>Add track</button>
                    </div>
                    <div className="right-options">
                        <button id="send-button">Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
