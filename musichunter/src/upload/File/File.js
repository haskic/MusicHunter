import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import API from './../api';
import * as mm from 'music-metadata-browser';

import cameraIcon from './../../icons/cameraIcon.png';
import fileStyle from './File.scss';
import ProgressBar from '../uploadProgressBar/ProgressBar';

//test token
import token from './../../testData/token';
//test token

function File(props) {
    const [fileData, setFileData] = useState({});
    const [hash, setHash] = useState("");
    const [uploadProgress, setuploadProgress] = useState(0);

    useEffect(() => {
        uploadFile(props.file);
    }, [])

    async function uploadFile(file) {
        const fileFromFileInput = file;
        let fileOne = new Blob([fileFromFileInput]);
        console.log("File = ", fileFromFileInput, fileOne);
        const formData = new FormData();
        formData.append("files", file);
        mm.parseBlob(fileOne).then(metadata => {
            console.log('Metadata: ', metadata);

            const blob = new Blob([metadata.common.picture[0].data], { type: metadata.common.picture[0].format });
            const url = window.URL.createObjectURL(blob);
            // const img = document.getElementById('song-image');
            // img.src = url;
            const fileData = {
                title: metadata.common.title,
                year: metadata.common.year,
                album: metadata.common.album,
                artist: metadata.common.artist,
                comment: metadata.common.comment,
                genre: metadata.common.genre[0],
                image: url
            }
            setFileData(fileData);
        });

        API.sendFile(formData, token, (progressEvent) => {
            console.log("Progress", progressEvent.loaded);
            setuploadProgress(progressEvent.loaded * 100 / fileFromFileInput.size);
        }, (res) => {
            setHash(res.data.hash);
            setuploadProgress(100);
        });
    }



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
    function saveButtonHandler() {
        console.log("SAVE BUTTON CLICK");
        let trackObj = { Name: fileData.title, Artist: fileData.artist, Hash: hash, OwnerId: 1 };
        API.addTrack(trackObj, token, (res) => {console.log("SAVE BUTTON RESPONSE ", res.data)});
    }

    return (<div className="file" style={fileStyle.file}>
        <div className="progress-bar">
            <ProgressBar progress={uploadProgress}></ProgressBar>
        </div>
        <div className="track-data">
            <div className="track-cover">
                <img src={fileData.image} id="album-cover">
                </img>
                <label for="file-upload" className="custom-file-upload"><img src={cameraIcon}></img> Update image</label>
            </div>
            <div className="track-info">
                <label for="track-title"><span>Title</span><input name="track-title" type="text" value={fileData.title}></input></label>
                <label for="track-genre">Genre<input name="track-genre" type="text" value={fileData.genre}></input></label>
                <label for="track-description" className="description-label">Description<textarea name="track-description"></textarea></label>
                <div className="privacy-block">
                    <div>Privacy:</div>
                    <label><input type="radio" name="privacy" checked></input>Public</label>
                    <label><input type="radio" name="privacy"></input>Private</label>
                </div>
                <div className="buttons">
                    <button onClick={saveButtonHandler}>Save</button>
                    <button>Cancel</button>
                </div>
            </div>
            <input id="file-upload" type="file" multiple={false} onChange={(e) => onFileSelect(e)}></input>
        </div>

    </div>);

}

export default File;