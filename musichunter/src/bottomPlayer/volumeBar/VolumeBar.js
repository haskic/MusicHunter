import React, { useState,useEffect } from 'react';
import volumeLevelTop from './../icons/volume-level-top.png';

function VolumeBar() {
    const [progressVolumeHeight, setprogressVolumeHeight] = useState(50);
    const [volumeBarIsActive, setvolumeBarIsActive] = useState(false);
    const [pointerIsActive, setpointerIsActive] = useState(false)
    let progressBarLine;
    let audioPlayer;
    useEffect(() => {
            progressBarLine = {
                rect: document.getElementsByClassName("bottom-player-container-volumebar-bar-container-line")[0].getBoundingClientRect(),
            }
        audioPlayer = document.getElementById("audio-player");
    });
    useEffect(() => {
        setprogressVolumeHeight(audioPlayer.volume * 100);
        
    }, [])
    function volumeBarLineClickHandler(e) {
        setVolumeHeightByMousePos({x: e.pageX,y:e.pageY});
    }
    function volumeBarLineMouseDownHandler(e){
        document.addEventListener("mousemove",mouseMoveHandler,false);
        document.addEventListener("mouseup",volumeBarLineMouseUpHandler,false);
        setpointerIsActive(true);
    }
    function mouseMoveHandler(e){
        setVolumeHeightByMousePos({x: e.pageX,y:e.pageY});
    }
    function volumeBarLineMouseUpHandler(e){
        document.removeEventListener("mousemove",mouseMoveHandler,false);
        document.removeEventListener("mouseup",volumeBarLineMouseUpHandler,false);
        setpointerIsActive(false);
    }

    function setVolumeHeightByMousePos(mousePos){
        console.log("PROGRESS BAR INFO",mousePos.y,progressBarLine.rect.bottom);
        if (mousePos.y <= progressBarLine.rect.top){
            setprogressVolumeHeight(100);
        console.log("AAAA",mousePos.y,progressBarLine.rect.bottom);
        audioPlayer.volume = 1;
            return;
        }
        if (mousePos.y >= progressBarLine.rect.bottom){
            setprogressVolumeHeight(0);
            console.log("BBBB",mousePos.y,progressBarLine.rect.bottom);
            audioPlayer.volume = 0;

            return;
        }
        let lineHeight = progressBarLine.rect.height - (mousePos.y - progressBarLine.rect.top)*100 / progressBarLine.rect.height;
        if (lineHeight < 0){
            lineHeight = 0;
        }
        else if (lineHeight > 100){
            lineHeight = 100;
        }
        console.log("LINE HEIGHT = ",lineHeight);
        setprogressVolumeHeight(lineHeight);
        audioPlayer.volume = lineHeight / 100;
    }

    function mouseEnterHandler(e){
        setvolumeBarIsActive(true)
    }
    function mouseLeaveHandler(e){
        if (pointerIsActive){
            return;
        }
        else{
            setvolumeBarIsActive(false)
        }
    }
    return (
        <div onMouseEnter={(e) => mouseMoveHandler(e)} onMouseEnter={(e) => mouseEnterHandler(e)} onMouseLeave={(e) => mouseLeaveHandler(e)}>
            <img src={volumeLevelTop}></img>
            <div className="bottom-player-container-volumebar-bar-container" style={{display: volumeBarIsActive? "flex": "none"}} onClick={(e) => volumeBarLineClickHandler(e)} onMouseDown={(e) => volumeBarLineMouseDownHandler(e)}>
                <div className="line-container" >
                    <div className="bottom-player-container-volumebar-bar-container-line" ></div>
                    <div className="bottom-player-container-volumebar-bar-container-progress-line" style={{ height: progressVolumeHeight + "%" }}></div>
                    <div className="bottom-player-container-volumebar-bar-container-progress-pointer"></div>
                </div>
                <div className="bottom-player-container-volumebar-bar-container-triangle"></div>
            </div>
        </div>
    );
}

export default VolumeBar;