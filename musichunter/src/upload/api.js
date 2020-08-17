import axios from 'axios';

export default {
    sendFile: function (formData, token, onProgressHandler, callback) {
        axios.post('https://localhost:5001/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": token
            },
            onUploadProgress: progressEvent => {
                if (onProgressHandler) {
                    onProgressHandler(progressEvent);

                }
                // console.log("Progress", progressEvent.loaded);
                // setProgressState({ ...progressState, [file.id]: progressEvent.loaded * 100 / file.entity.size });
            }
        }).then((res) => {
            if (callback) {
                callback(res);

            }
        });
    }
}