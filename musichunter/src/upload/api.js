import axios from 'axios';

export default {
    sendFile: function (formData, token, onProgressHandler, callback) {
        axios.post('https://localhost:5001/upload/track', formData, {
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
    sendFiles: function (formData, token, onProgressHandler, callback) {
        axios.post('https://localhost:5001/upload/playlist', formData, {
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
    addTrack: function (trackObj, token, callback) {
        axios.post('https://localhost:5001/track/add', JSON.stringify(trackObj), {
            headers: {
                'Content-Type': 'application/json',
                "token": token
            },
        }).then((res) => {
            if (callback) {
                callback(res);
            }
        });
    },
    addTracks: function (trackObjArray, token, callback) {
        axios.post('https://localhost:5001/tracks/add', trackObjArray, {
            headers: {
                'Content-Type': 'application/json',
                "token": token
            },
        }).then((res) => {
            if (callback) {
                callback(res);
            }
        });
    },
    uploadImage: function(formData, token, onProgressHandler, callback) {
        axios.post('https://localhost:5001/upload/image', formData, {
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

    addPlaylist: function (PlaylistObj, token, callback) {
        axios.post('https://localhost:5001/playlist/add', JSON.stringify(PlaylistObj), {
            headers: {
                'Content-Type': 'application/json',
                "token": token
            },
        }).then((res) => {
            if (callback) {
                callback(res);
            }
        });
    },
    addPlaylistRelations: function (relations, token, callback) {
        axios.post('https://localhost:5001/playlist/relations/add', relations, {
            headers: {
                'Content-Type': 'application/json',
                "token": token
            },
        }).then((res) => {
            if (callback) {
                callback(res);
            }
        });
    },
    addPlaylistRelation: function (relation, token, callback) {
        axios.post('https://localhost:5001/playlist/relation/add', JSON.stringify(relation), {
            headers: {
                'Content-Type': 'application/json',
                "token": token
            },
        }).then((res) => {
            if (callback) {
                callback(res);
            }
        });
    }
}