import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import './scss/TrackDiagram.scss';

const default_arr = [];
for (let i = 0; i < 702; i += 3) {
    let heightValue = randomInteger(15, 50);
    // console.log("HEIGHTValue = ", heightValue);
    // ctx.fillRect(i, 0, 2.5, heightValue);
    default_arr.push({ x: i, y: 70, width: 2.2, height: -heightValue });
}

function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    // console.log(Math.round(rand));
    return Math.round(rand);

}

function updateDiagram(canvas, currentX) {
    let rect = canvas.current.getBoundingClientRect();
    let ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, rect.width, rect.height);
    default_arr.forEach((element, index) => {
        if (element.x <= currentX - element.width) {
            ctx.fillStyle = 'rgba(0,0,254,1)';
            ctx.fillRect(element.x, element.y, element.width, element.height);
        }
        else if (element.x <= currentX && currentX <= element.x + element.width) {
            ctx.fillStyle = 'rgba(0,0,254,0.1)';
            if (currentX - element.x > element.width / 12) {
                ctx.fillStyle = 'rgba(0,0,254,0.1)';
            }
            if (currentX - element.x > 2 * element.width / 12) {
                ctx.fillStyle = 'rgba(0,0,254,.2)';
            }
            if (currentX - element.x > 3 * element.width / 12) {
                ctx.fillStyle = 'rgba(0,0,254,.3)';
            }
            if (currentX - element.x > 4 * element.width / 12) {
                ctx.fillStyle = 'rgba(0,0,254,.4)';
            }
            if (currentX - element.x > 5 * element.width / 12) {
                ctx.fillStyle = 'rgba(0,0,254,.5)';
            }
            if (currentX - element.x > 6 * element.width / 12) {
                ctx.fillStyle = 'rgba(0,0,254,.6)';
            }
            if (currentX - element.x > 7 * element.width / 12) {
                ctx.fillStyle = 'rgba(0,0,254,.7)';
            }
            if (currentX - element.x > 8 * element.width / 12) {
                ctx.fillStyle = 'rgba(0,0,254,.8)';
            }
            if (currentX - element.x > 9 * element.width / 12) {
                ctx.fillStyle = 'rgba(0,0,254,.9)';
            }
            if (currentX - element.x > 10 * element.width / 12) {
                ctx.fillStyle = 'rgba(0,0,254,1)';
            }
            ctx.fillRect(element.x, element.y, (currentX - element.x), element.height);
            ctx.fillStyle = 'rgba(0,0,254,0.1)';
            ctx.fillRect(currentX, element.y, element.width - (currentX - element.x), element.height);
        }
        else {
            ctx.fillStyle = 'rgba(0,0,254,0.1)';
            ctx.fillRect(element.x, element.y, element.width, element.height);
        }
    });
}


function TrackDiagram(props) {
    const canvasElement = useRef(null);
    const [isActive, setisActive] = useState(false);
    const [updateInterval, setupdateInterval] = useState(null);
    useEffect(() => {
        drawDiagram();
    }, []);
    useEffect(() => {
        return () => {
            clearInterval(updateInterval);
        };
    }, [updateInterval])
    useEffect(() => {
        if (props.albumHash) {
            if (props.albumHash == props.store.playlist.hash && props.hash === props.store.currentSong.hash) {
                setisActive(true);
                let audioPlayer = document.getElementById("audio-player");
                let timer = setInterval(() => {
                    let currentX = audioPlayer.currentTime / audioPlayer.duration * 702;
                    updateDiagram(canvasElement, currentX);
                }, 50);
                setupdateInterval(timer);
                console.log("TIMER ID  = ", updateInterval);
                console.log("TIMER ID normal = ", timer);
            }
            else {
                clearInterval(updateInterval);
                setisActive(false);
                drawDiagram();

            }
        }
        else {
            if (props.hash === props.store.currentSong.hash) {
                setisActive(true);
                let audioPlayer = document.getElementById("audio-player");
                let timer = setInterval(() => {
                    let currentX = audioPlayer.currentTime / audioPlayer.duration * 702;
                    updateDiagram(canvasElement, currentX);
                }, 50);
                setupdateInterval(timer);
                console.log("TIMER ID  = ", updateInterval);
                console.log("TIMER ID normal = ", timer);

            }
            else {
                clearInterval(updateInterval);
                setisActive(false);
                drawDiagram();

            }
        }

    }, [props.store.currentSong]);

    function drawDiagram() {
        let rect = canvasElement.current.getBoundingClientRect();
        let ctx = canvasElement.current.getContext('2d');
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.fillStyle = 'rgba(180,180,180,1)';
        default_arr.forEach((element) => {
            ctx.fillRect(element.x, element.y, element.width, element.height);
        });
    }
    return (<div className="track-diagram">
        <canvas width="702px" height="70px" ref={canvasElement}></canvas>
    </div>);

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
        changePlayingToggle: () => {
            dispatch({ type: 'PLAYING_TOGGLE' })
        },
        changeSong: (value) => {
            dispatch({ type: 'SET_SONG', song: value })
        },
        changeIsPlayingState: (value) => {
            dispatch({ type: 'SET_PLAYING_STATE', isPlaying: value })
        },
    })
)(TrackDiagram);