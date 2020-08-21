
import React, { useState } from 'react';
import axios from 'axios';
import animator from './../animation/animator';

import * as mm from 'music-metadata-browser';
import testFile from './../lose.mp3';


import File from './file/File';
import './scss/Uploader.scss';
import FileList from './fileList/FileList';

import default_cover from './../AlbumCover.jpeg'
import ProgressBar from './uploadProgressBar/ProgressBar';
import Success from '../events/success/Success';


function Uploader() {
    const [isShowFileInfo, setisShowFileInfo] = useState(false);
    const [isMultipleFiles, setIsMultipleFiles] = useState(false)
    const [fileData, setfileData] = useState({});
    const [uploadProgress, setuploadProgress] = useState(0);
    const [files, setFiles] = useState(null);
    const [successText, setSuccessText] = useState("Track was uploaded");

    // async function UploadFile(e) {
    //     let fileInput = document.getElementById("file-upload");
    //     const formData = new FormData();
    //     for (var i = 0; i < fileInput.files.length; i++) {
    //         formData.append("files", fileInput.files[i]);
    //     }
    //     let result = await fetch("https://localhost:5001/upload", {
    //         method: "POST",
    //         body: formData,
    //         headers: {
    //             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkFsZXhhZGVyIiwiaWF0IjoiMjAyMC0wNy0xM1QxNjozMTozMS4xNzUzNDA3WiJ9.7PXC2f3F2SnY1zWJgT9tJ_qahHqT7bF65AZPNekdQh4"
    //         }
    //     }).then((response) => {
    //         console.log("File upload response: ", response);
    //     });

    // }

    // React.useEffect(() => {
    //     setTimeout(() => {
    //         console.log("ELEMENT",document.getElementsByClassName("slide-2")[0]);
    //         animator.animate(document.getElementsByClassName("slide-2")[0], "nextSlide-animated");
    //     }, 2000);

    // }, [])

    function fileChangeHandler(event) {
        let fileList = event.target.files;
        console.log("TARGET", event.target.files, "   ", fileList.length);

        if (fileList.length > 1) {
            setFiles(fileList);
            setIsMultipleFiles(true);
            setSuccessText("Playlist was uploaded.");
        }
        else {
            setFiles(fileList[0]);
            setIsMultipleFiles(false);
            setSuccessText("Track was uploaded.");
        }
        setisShowFileInfo(true);
    }
    async function UploadFile() {
        const fileInput = document.getElementById("file-upload");
        const fileFromFileInput = fileInput.files[0];
        let fileOne = new Blob([fileFromFileInput]);
        console.log("File = ", fileFromFileInput, fileOne);

        const formData = new FormData();
        for (var i = 0; i < fileInput.files.length; i++) {
            formData.append("files", fileInput.files[i]);
        }

        mm.parseBlob(fileOne).then(metadata => {
            // metadata has all the metadata found in the blob or file
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
            setfileData(fileData);
        });
        await axios.post('https://localhost:5001/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkFsZXhhZGVyIiwiaWF0IjoiMjAyMC0wNy0xM1QxNjozMTozMS4xNzUzNDA3WiJ9.7PXC2f3F2SnY1zWJgT9tJ_qahHqT7bF65AZPNekdQh4"
            },
            onUploadProgress: progressEvent => {
                console.log("Progress", progressEvent.loaded);
                setuploadProgress(progressEvent.loaded * 100 / fileFromFileInput.size);
            }
        });
        setisShowFileInfo(true);
    }

    return (<div className="uploader-container">
        <div className="slide slide-1">
            {!isShowFileInfo ?
                <React.Fragment>
                    <label for="file-upload" className="custom-file-upload">choose files to upload</label>
                    <input id="file-upload" type="file" multiple={true} onChange={(e) => fileChangeHandler(e)}></input>
                    <label className="playlist-maker"><input type="checkbox"></input>Make playlist when multiple files are selected</label>
                    <div className="privacy-block">
                        Privacy:
               <label><input type="radio" name="privacy" checked></input>Public</label>
                        <label><input type="radio" name="privacy"></input>Private</label>
                    </div>
                </React.Fragment>
                :
                isMultipleFiles ?
                    <FileList files={files}></FileList>
                    :
                    <File file={files}></File>
            }
        </div>
        <div className="slide slide-2">
            <Success title="Success" text="Track was uploaded"></Success>
        </div>

    </div>);

}


export default Uploader;
