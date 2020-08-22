import axios from 'axios';

export default {

    regisration: function (userObj, token, onProgressHandler, callback) {
        axios.post('https://localhost:5001/api/regisration', userObj, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": token
            },
            onUploadProgress: progressEvent => {
                if (onProgressHandler) {
                    onProgressHandler(progressEvent);

                }
            }
        }).then((res) => {
            if (callback) {
                callback(res);

            }
        });
    },
}