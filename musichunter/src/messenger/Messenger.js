import React, { useState, useEffect, useMemo } from 'react';
import { HubConnectionBuilder, HttpTransportType, HubConnection } from '@microsoft/signalr';
import { connect } from 'react-redux';

import LeftMenu from './leftMenu/LeftMenu';
import MessageContainer from './messageContainer/MessageContainer';
import MessengerContext from './messengerContext/MessengerContext';

import './scss/Messenger.scss';


function Messenger(props) {
    const [Context, setContext] = useState({ messages: null, name: null, activeMember: { index: null, hash: null } });
    const [hubConnection, setHubConnection] = useState(null);

    useEffect(() => {
        let connection = new HubConnectionBuilder().withUrl("http://localhost:5000/messenger").build();
        connection.start().then(() => { console.log("SignalR connection STARTED") }).catch((e) => { console.log("Error") }).then(() => {
            console.log("STATE = ", connection.connectionState);
            if (connection.connectionState === "Connected") {
                connection.invoke("Connect", "AlexanderHash");
                console.log("Messenger Hub connected successfully");
            }
            // connection.on("GetResponse", function (textResponse) {
            //     console.log("RESPONSE FROM SERVER = " + textResponse);
            // });

        });
        setHubConnection(connection);
    }, []);
    useEffect(() => {
        if (hubConnection) {
            hubConnection.on("GetMessage", function (message) {
                console.log("Get message obj:  ", message);
                // console.log("Get message with text : " + message.Text + "   from " + message.HashSender);
                setContext({
                    ...Context,
                    messages: [
                        ...Context.messages, {
                            sender: 'Tech N9ne',
                            to: 'Me',
                            text: message.text,
                            attachment: null,
                            time: '14:52'
                        }
                    ]

                });
            });
        }

    }, [Context])
    function sendMessage(text, receiverHash) {
        let messageObj = { Text: text };
        hubConnection.invoke("SendMessage", props.store.currentUser.email, receiverHash, messageObj);
    }
    return (<div className="messenger">
        <div className="messenger-container">
            <MessengerContext.Provider value={[Context, setContext]}>
                <LeftMenu></LeftMenu>
                <MessageContainer sendMessage={(text, receiverHash) => sendMessage(text, receiverHash)}></MessageContainer>
            </MessengerContext.Provider>
        </div>
        <button onClick={() => { hubConnection.invoke("SendMessage", props.store.currentUser.email, "kot3sany@gmail.com", "Hello world", { Text: "Test Message TExxt" }) }}>Test Button</button>
    </div>)
}


export default connect(
    state => ({ store: state }),
    dispatch => ({
        changeIslogin: (value) => {
            dispatch({ type: 'ZHAKAR', isLogin: value })
        },
        changeCurrentTrack: (value) => {
            dispatch({ type: 'PLAYLIST_SET_COUNTER', counterValue: value })
        },
        changeIsPlayingState: (value) => {
            dispatch({ type: 'SET_PLAYING_STATE', isPlaying: value })
        },
        changeSong: (value) => {
            dispatch({ type: 'SET_SONG', song: value })
        },
        changeRegFormState: (value) => {
            dispatch({ type: "SET_IS_SHOW_REGISTRATION_FORM", payload: value })
        },
        changeLoginFormState: (value) => {
            dispatch({ type: "SET_IS_SHOW_LOGIN_FORM", payload: value })
        },
        setLoginState: (value) => {
            dispatch({ type: 'LOGIN_USER', payload: value })
        },
        logoutUser: () => {
            dispatch({ type: "LOGOUT_USER" })
        }
    })
)(Messenger);

