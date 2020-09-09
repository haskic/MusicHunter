import axios from 'axios';
export default {

    getTracks: function (userHash, token, callback) {
        axios.get('https://localhost:5001/api/user/getTracks', {
            params: {
                userHash: userHash
            },
            headers: {
                token: token
            }
        }).then((res) => {
            callback(res);
        });
    },
    getPlaylists: function (userHash, token, callback) {
        axios.get('https://localhost:5001/api/user/getPlaylists', {
            params: {
                userHash: userHash
            },
            headers: {
                token: token
            }
        }).then((res) => {
            callback(res);
        });
    }
}