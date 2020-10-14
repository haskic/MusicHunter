function reducer(state = {}, action) {
    let newState = Object.assign({},state);
    // if (action.type == "ADD_WORD") {
    //     if (newState.words == undefined){
    //         newState.words = [];
    //     }
    //     Object.assign(newState, { words: [...newState.words, { word: action.word, translate: action.translate }] });
    //     return newState;
    // }

    if (action.type == "SET_SONG"){
        newState.currentSong = action.song;
        return newState;
    }
    if (action.type == "PLAYLIST_NEXT_SONG"){
        newState.playlistCounter += 1;
        return newState;
    }
    if (action.type == "PLAYLIST_SET_COUNTER"){
        newState.playlistCounter = action.counterValue;
        return newState;
    }
    if (action.type == "PLAYLIST_COUNTER_RESET"){
        newState.playlistCounter = 0;
        return newState;
    }
    if (action.type == "PLAY_SONG"){
        newState.isPlaying = true;
        return newState;
    }
    if (action.type == "PAUSE_SONG"){
        newState.isPlaying = false;
        return newState;
    }
    if (action.type == "SET_PLAYING_STATE"){
        newState.isPlaying = action.isPlaying;
        return newState;
    }
    if (action.type == "PLAYING_TOGGLE"){
        if (newState.isPlaying){
            newState.isPlaying = false;
        }
        else{
            newState.isPlaying = true;
        }
        return newState;
    }
    if (action.type == "SET_PLAYLIST"){
        // newState.playlist = {name: "DEFAULT PLAYLIST", tracklist: action.tracklist}
        newState.playlist = action.playlist
        newState.playlistCounter = 0;
        return newState;
    }
    if (action.type == "SET_PLAYLIST_AND_PLAY"){
        newState.playlist = action.playlist;
        newState.currentSong = action.playlist.tracks[0];
        newState.isPlaying = true;
        newState.playlistCounter = 0;
        return newState;
    }
    if (action.type == "LOGIN_USER"){
        newState.currentUser = action.payload;
        newState.isLogin = true;
        return newState;
    }
    if (action.type == "LOGOUT_USER"){
        newState.currentUser = {};
        newState.isLogin = false;
        return newState;
    }
    if (action.type == "SET_IS_SHOW_REGISTRATION_FORM"){
        newState.regForm = Object.assign(newState.regForm,action.payload);
    }
    if (action.type == "SET_IS_SHOW_LOGIN_FORM"){
        newState.loginForm = Object.assign(newState.loginForm,action.payload);
    }
    
    // if (action.type == "AUTH_INFO") {
    //     Object.assign(newState, { email: action.email });
    //     return newState;
    // }
    
    return newState;
}

export default reducer;