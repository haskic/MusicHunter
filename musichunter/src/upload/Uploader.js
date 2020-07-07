import React from 'react';

import './scss/Uploader.scss';


function Uploader() {

    return (<div className="uploader-container">
        <label for="file-upload" className="custom-file-upload">choose files to upload</label>
        <input id="file-upload" type="file"></input>
        <label className="playlist-maker">
            <input type="checkbox"></input>
            Make playlist when multiple files are selected
            </label>
        <div className="privacy-block">
            Privacy:
            <label>
                <input type="radio" name="privacy" checked></input>
                Public
            </label>
            <label>
                <input type="radio" name="privacy"></input>
                Private
            </label>

        </div>


    </div>);

}


export default Uploader;
