import React, { useEffect, useState, useRef } from 'react';

import cameraIcon from './../../icons/cameraIcon.png';
import fileStyle from './File.scss';
import ProgressBar from '../uploadProgressBar/ProgressBar';



function File(props) {
    // const [uploadProgress, setUploadProgress] = useState(0);
    const r = useRef(null);
    // r.current = { uploadProgress, setUploadProgress };
    // useEffect(() => {
    //     const id = setInterval(() => {
    //         setUploadProgress(r.current.uploadProgress + 0.1);
    //         console.log("SET INTERVAL");
    //         console.log(uploadProgress);
    //         if (r.current.uploadProgress >= 100){
    //             clearInterval(id);
    //         }
    //     }, 5);
    //     return () => {clearInterval(id)};
    // }, []);
    function onFileSelect(event) {

        let files = event.target.files;
        if (FileReader && files.length) {
            let fr = new FileReader();
            fr.onload = function () {
                document.getElementById("album-cover").src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        }

    }

    return (<div className="file" style={fileStyle.file}>
        <div className="progress-bar">
            <ProgressBar progress={props.uploadProgress}></ProgressBar>
        </div>
        <div className="track-data">
            <div className="track-cover">
                <img src={props.fileData.image} id="album-cover">
                </img>
                <label for="file-upload" className="custom-file-upload"><img src={cameraIcon}></img> Update image</label>
            </div>
            <div className="track-info">
                <label for="track-title"><span>Title</span><input name="track-title" type="text" value={props.fileData.title}></input></label>
                <label for="track-genre">Genre<input name="track-genre" type="text" value={props.fileData.genre}></input></label>
                <label for="track-description" className="description-label">Description<textarea name="track-description"></textarea></label>
                <div className="privacy-block">
                    <div>Privacy:</div>
                    <label><input type="radio" name="privacy" checked></input>Public</label>
                    <label><input type="radio" name="privacy"></input>Private</label>
                </div>
                <div className="buttons">
                    <button>Save</button>
                    <button>Cancel</button>
                </div>
            </div>
            <input id="file-upload" type="file" multiple={false} onChange={(e) => onFileSelect(e)}></input>
        </div>

    </div>);

}

export default File;