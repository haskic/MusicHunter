import React from 'react';

import styler from './../../utils/styler/styler';

const defautlProgressBarStyle = {
    display: 'flex',
    minHeight: '30px',
    width: '100%',
    position: 'relative',
    flexDirection: 'column',
    progressBarContainer: {
        display: 'flex',
        height: '5px',
        width: '100%',
        backgroundColor: 'rgb(180,180,180)',
        position: 'relative',
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
    progressTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5px'
    }
}




export default function ProgressBar(props) {
    return (<div className="progress-bar" style={styler.style(defautlProgressBarStyle, props.style?.progressBar)}>
        <div className="progress-title" style={styler.style(defautlProgressBarStyle.progressTitle, props.style?.progressTitle)}>
            {"Loading " + parseInt(props.progress) + "%"}
        </div>
        <div className="progress-bar-container" style={styler.style(defautlProgressBarStyle.progressBarContainer, props.style?.progressBarContainer)}>
            <div className="progress" style={styler.style(defautlProgressBarStyle.progress, props.style?.progress, { width: props.progress + "%" })}></div>
        </div>
    </div>)
}