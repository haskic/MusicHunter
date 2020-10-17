import API from './api';

export default function searchHandler(text, token) {
    let searchResult = [];
    function callBack(res) {
        searchResult = [];
        console.log("Search response",res.data);
        console.log("Search response",res.data.searchResult);
        res.data.searchResult.forEach(element => {
            searchResult.push(element);
        });
    }
    function searchExecute() {
        API.searchByText(text, token, callBack);
    }
    return searchResult;
}