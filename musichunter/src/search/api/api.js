import axios from 'axios';

export default {
    searchByText: function (text,section, token, callback) {
        axios.get(`https://localhost:5001/api/search/${section}`, {
            params: {
                line: text
            },
            headers: {
                token: token
            }
        }).then((res) => {
            callback(res);
        });
    }
}