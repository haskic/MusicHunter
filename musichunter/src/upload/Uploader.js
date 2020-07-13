import React from 'react';

import './scss/Uploader.scss';


function Uploader() {

    async function UploadFile(){
        let fileInput = document.getElementById("file-upload");
        const formData = new FormData();
        for (var i = 0; i < fileInput.files.length; i++) {
            formData.append("files",fileInput.files[i]);
        }
        // console.log(fileInput.files[0]);
        // formData.append("files", fileInput.files[0]);
        let result = await fetch("https://localhost:5001/upload", {
            method: "POST",
            body: formData,
            headers: {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkFsZXhhZGVyIiwiaWF0IjoiMjAyMC0wNy0xM1QxNjozMTozMS4xNzUzNDA3WiJ9.7PXC2f3F2SnY1zWJgT9tJ_qahHqT7bF65AZPNekdQh4" 
            }
        }).then((response) => {
            // response.body is a readable stream.
            // Calling getReader() gives us exclusive access to
            // the stream's content
            var reader = response.body.getReader();
            var bytesReceived = 0;
          
            // read() returns a promise that resolves
            // when a value has been received
            return reader.read().then(function processResult(result) {
              // Result objects contain two properties:
              // done  - true if the stream has already given
              //         you all its data.
              // value - some data. Always undefined when
              //         done is true.
              if (result.done) {
                console.log('Fetch complete');
                return;
              }
          
              // result.value for fetch streams is a Uint8Array
              bytesReceived += result.value.length;
              console.log('Received', bytesReceived, 'bytes of data so far');
          
              // Read some more, and call this function again
              return reader.read().then(processResult);
            });
          });;
        console.log("RESULT FILE UPLOAD: ",result);
    }

    return (<div className="uploader-container">
        <label for="file-upload" className="custom-file-upload">choose files to upload</label>
        <input id="file-upload" type="file" multiple={true} onChange={UploadFile}></input>
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
