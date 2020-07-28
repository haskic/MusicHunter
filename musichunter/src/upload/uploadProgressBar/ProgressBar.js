import React from 'react';

import styler from './../../utils/styler/styler';

const defautlProgressBarStyle = {
    display: 'flex',
    height: '5px',
    width: '100%',
    position: 'relative',
    progressBarContainer: {
        display: 'flex',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgb(180,180,180)'
    },
    progress: {
        position: 'absolute',
        height: '100%',
        left: 0,
        top: 0,
        display: 'flex',
        width: '0%',
        backgroundColor: 'rgb(30, 127, 201)',

    },
}




export default function ProgressBar(props) {
    return (<div className="progress-bar" style={styler.style(defautlProgressBarStyle,props.style?.progressBar)}>
        <div className="progress-bar-container" style={styler.style(defautlProgressBarStyle.progressBarContainer,props.style?.progressBarContainer)}>
            <div className="progress" style={styler.style(defautlProgressBarStyle.progress,props.style?.progress,{width: props.progress + "%"})}>
            </div>
        </div>
    </div>)
}