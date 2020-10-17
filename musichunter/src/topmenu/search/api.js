import axios from 'axios';

export default {
    searchByText: function (text, token, callback) {
        axios.get('https://localhost:5001/api/search', {
            params: {
                searchText: text
            },
            headers: {
                token: token
            }
        }).then((res) => {
            callback(res);
        });
    }
}