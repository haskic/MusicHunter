import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import API from './../api';
import * as mm from 'music-metadata-browser';
import animator from './../../animation/animator';

import cameraIcon from './../../icons/cameraIcon.png';
import fileStyle from './File.scss';
import ProgressBar from '../uploadProgressBar/ProgressBar';

//test token
import token from './../../testData/token';
//test token

function File(props) {
    const [fileData, setFileData] = useState({});
    const [hashUrl, setHashUrl] = useState("");
    const [uploadProgress, setuploadProgress] = useState(0);
    const [imageFile, setImageFile] = useState(null);

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
            let imageFormat = "";
            if (metadata.common.picture[0].format === "image/jpeg"){
                imageFormat = ".jpg";
            }
            console.log("Result format : ", "picture" + imageFormat);
           
            const url = window.URL.createObjectURL(blob);
            var imageFile ="picture.jpg";
            setImageFile(blob);
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
            setHashUrl(res.data.hashUrl);
            setuploadProgress(100);
        });
        
    }
    function blobToFile(theBlob, fileName){
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;

        return theBlob;
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
        setImageFile(files[0]);
    }
    function successAnimation(){
            animator.animate(document.getElementsByClassName("slide-2")[0], "nextSlide-animated");
    }
    function saveButtonHandler() {
        console.log("SAVE BUTTON CLICK");
        let trackObj = { Name: fileData.title, Artist: fileData.artist, HashUrl: hashUrl, OwnerId: 1 };
        let formDataImage = new FormData();
        let imageName;
        if (imageFile.type === 'image/jpeg'){
            imageName = 'picture.jpg';
        }
        else if (imageFile.type === 'image/png'){
            imageName = 'picture.png';
        }
        formDataImage.append('files',imageFile, imageName);
        API.uploadImage(formDataImage,token,null, (res) => {
            let imageUrl = res.data.hashUrl;
            trackObj.ImageUrl = imageUrl;
            console.log("IMAGE RESPONSE",res);
            API.addTrack(trackObj, token, (res) => {
                console.log("SAVE BUTTON RESPONSE ", res.data);
                if (res.data.status){
                    successAnimation();
                }
            });
        });
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
                <label for="track-title"><span>Title</span><input name="track-title" type="text" defaultValue={fileData.title} onChange={(e) => setFileData({...fileData,...{title: e.target.value}})}></input></label>
                <label for="track-genre">Genre<input name="track-genre" type="text"  defaultValue={fileData.genre} onChange={(e) => setFileData({...fileData,...{genre: e.target.value}})}></input></label>
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