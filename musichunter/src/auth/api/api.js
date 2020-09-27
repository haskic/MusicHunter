import axios from 'axios';

export default {

    regisration: function (userObj, token, callback) {
        axios.post('https://localhost:5001/api/public/registration', userObj, {
            headers: {
                'Content-Type': 'application/json',

            },
        }).then((res) => {
            if (callback) {
                callback(res);

            }
        });
    },
    googleVerify: function (googleTokenObj, callback) {
        axios.post('https://localhost:5001/api/public/googleVerify', googleTokenObj, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            if (callback) {
                callback(res);
            }
        });
    },
    login: function (userObj, callback) {
        axios.post('https://localhost:5001/api/public/login', userObj, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            if (callback) {
                callback(res);
            }
        });
    },
    defaultTokenVerify: function (default_token, callback) {
        axios.get('https://localhost:5001/api/public/userByToken', {
            params: {
                token: default_token
            },
        }
        ).then((res) => {
            if (callback) {
                callback(res);
            }
        });
    },
}