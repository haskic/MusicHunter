
import React, { useState } from 'react';

import * as mm from 'music-metadata-browser';
import testFile from './../lose.mp3';


import File from './file/File';
import './scss/Uploader.scss';


import default_cover from './../AlbumCover.jpeg'


function Uploader() {
    const [isShowFileInfo, setisShowFileInfo] = useState(false);
    const [fileData, setfileData] = useState({});
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
    const UploadFile = () => {
        const fileFromFileInput = document.getElementById("file-upload").files[0];
        let fileOne = new Blob([fileFromFileInput]);
        console.log("File = ", fileFromFileInput, fileOne);
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
        setisShowFileInfo(true);
    }

    return (<div className="uploader-container">
        {isShowFileInfo ?
            <File fileData={fileData}></File> :
            <React.Fragment>
                <label for="file-upload" className="custom-file-upload">choose files to upload</label>
                <input id="file-upload" type="file" multiple={true} onChange={(e) => UploadFile()}></input>
                {/* <File trackCover={default_cover}></File> */}
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
            </React.Fragment>
        }
    </div>);

}


export default Uploader;
