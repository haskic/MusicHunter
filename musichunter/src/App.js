import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import { Provider, connect, ReactReduxContext } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer/reducer';
import './App.css';
import HomePage from './home/HomePage';
import Registration from './auth/registration/Registration';
import TopMenu from './topmenu/TopMenu';
import BottomPlayer from './bottomPlayer/BottomPlayer';
import NotificationsContext from './NotificationsContext';
import { HubConnectionBuilder } from '@microsoft/signalr';
import SignalRContext from './signalRContext';
import song from "./shakira.mp3";

import defaultCover from './AlbumCover.jpeg';
import song2 from './shakira.mp3';
import song3 from './lose.mp3';
import CenterContainer from './centerContainer/CenterContainer';
import IsLoginChecker from './auth/isLoginChecker/IsLoginChecker';

console.log("SONG = ", song)
SignalRContext.connection = new HubConnectionBuilder().withUrl("http://localhost:5000/notifications").build();
SignalRContext.connection.start().then(() => { console.log("SignalRContext.connection STARTED") }).catch((e) => { console.log("Error") }).then(() => {
  console.log("STATE = ", SignalRContext.connection.connectionState);
  if (SignalRContext.connection.connectionState === "Connected") {
    SignalRContext.connection.invoke("GetNotification", "Alexander from react want to fuck with you server");
  }
  SignalRContext.connection.on("GetResponse", function (textResponse) {
    console.log("RESPONSE FROM SERVER = " + textResponse);
  });
});


let default_tracklist = {
  hash: "1231231",
  tracks: [{ name: "Waka Waka Waka", artist: "Shakira", coverImage: defaultCover, src: song2 }
    , { name: "Lose Yourself", artist: "Eminem", coverImage: defaultCover, src: song3 }
    , { name: "Waka Waka Waka", artist: "Shakira", coverImage: defaultCover, src: song2 }
    , { name: "Lose Yourself", artist: "Eminem", coverImage: defaultCover, src: song3 }
    , { name: "Waka Waka Waka", artist: "Shakira", coverImage: defaultCover, src: song2 }
    , { name: "Lose Yourself", artist: "Eminem", coverImage: defaultCover, src: song3 }
    , { name: "Waka Waka Waka", artist: "Shakira", coverImage: defaultCover, src: song2 }
    , { name: "Lose Yourself", artist: "Eminem", coverImage: defaultCover, src: song3 }
    , { name: "Waka Waka Waka", artist: "Shakira", coverImage: defaultCover, src: song2 }
    , { name: "Lose Yourself", artist: "Eminem", coverImage: defaultCover, src: song3 }
    , { name: "Waka Waka Waka", artist: "Shakira", coverImage: defaultCover, src: song2 }
    , { name: "Lose Yourself", artist: "Eminem", coverImage: defaultCover, src: song3 }
    , { name: "Waka Waka Waka", artist: "Shakira", coverImage: defaultCover, src: song2 }
    , { name: "Lose Yourself", artist: "Eminem", coverImage: defaultCover, src: song3 }
    , { name: "Waka Waka Waka", artist: "Shakira", coverImage: defaultCover, src: song2 }]
};
const initStore = {
  regForm: {isShow: false},
  loginForm: {isShow: false}
}

var store = createStore(reducer,initStore, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.dispatch({ type: 'ZHAKAR', isLogin: "alexader" });
store.dispatch({ type: 'SET_SONG', song: { name: "Waka Waka Waka", artist: "Shakira", coverImage: defaultCover, src: song2 } });

store.dispatch({ type: 'PLAYLIST_COUNTER_RESET' });
store.dispatch({ type: 'SET_PLAYING_STATE', isPlaying: false });
store.dispatch({ type: 'SET_PLAYLIST', playlist: default_tracklist });
// store.dispatch({ type: 'PLAYLIST_SET_COUNTER', counterValue: -1});



function App() {

  return (
    <div className="App">
      <Router>
        <Provider store={store}>

          {/* <IsLoginChecker></IsLoginChecker> */}
          <NotificationsContext.Provider value={{ name: "Vladick" }}>
            <TopMenu></TopMenu>
          </NotificationsContext.Provider>
          {/* <Registration></Registration> */}
          {/* <audio controls>
  <source src={song} type="audio/mpeg"></source>

</audio> */}
          {/* <header className="App-header">
  <HomePage></HomePage>
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header> */}
          <CenterContainer></CenterContainer>
          <BottomPlayer></BottomPlayer>

        </Provider>
      </Router>


    </div>
  );
}

export default App;
