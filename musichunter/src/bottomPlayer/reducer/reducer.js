import pauseIco from './../icons/pause.png';
import playIco from './../icons/play.png';

export default function reducer(state, action) {
    let newState = state;
    switch (action.type) {
        case 'PLAY':
            newState.icon = pauseIco;
            newState.isPlaying = true;
            newState = Object.assign({}, newState);
            return newState;
        case 'PAUSE':
            newState.icon = playIco;
            newState.isPlaying = false;
            newState = Object.assign({}, newState);
            return newState;
        case 'SET_DURATION':
            // newState.audio.duration = parseInt(action.duration / 60);
            if (Number.isNaN(action.duration)) {
                return newState;
            }
            // console.log("DURATION = ", action.duration);
            let totalTime = new Date(0);
            totalTime.setSeconds(parseInt(action.duration)); // specify value for SECONDS here
            totalTime = totalTime.toISOString().substr(14,5);
            // console.log(totalTime)
            newState.audio.duration = totalTime;
            newState = Object.assign({}, newState);
            return newState;
        case 'SET_CURRENT_TIME':
            if (Number.isNaN(action.currentTime)) {
                return newState;
            }
            // console.log("DURATION = ", action.currentTime);
            let currentTime = new Date(0);
            currentTime.setSeconds(parseInt(action.currentTime)); // specify value for SECONDS here
            currentTime = currentTime.toISOString().substr(14,5);
            // console.log(currentTime)
            newState.audio.currentTime = currentTime;
            newState = Object.assign({}, newState);
            return newState;
        default:
            throw new Error();
    }
}