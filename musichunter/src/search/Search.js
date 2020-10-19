import React from 'react';
import searchIcon from './icon/searchIcon.png';
import { useLocation, useHistory } from "react-router-dom";
import queryString from 'query-string';


const testResults = [
    {
        title: "Alexander lol",
        type: "user",
        image: "image"
    },
    {
        title: "Alexander lol",
        type: "user",
        image: "image"
    },
    {
        title: "Alexander lol",
        type: "user",
        image: "image"
    },
    {
        title: "Alexander lol",
        type: "user",
        image: "image"
    }
]

export default function Search(props) {

    const [searchText, setSearchText] = React.useState("");
    // const [results, setResults] = React.useState(testResults);
    const [results, setResults] = React.useState([]);
    let history = useHistory();
    const location = useLocation();


    function keyHanlder(event) {
        var key = event.keyCode || event.which;
        if (key == 13) {
            if (props.searchHandler) {
                props.searchHandler(searchText);
            }
            console.log("Enter was pressed ", searchText, props);
            const parsed = queryString.parse(location.search);
            parsed.line = searchText;
            history.push("/search?" + queryString.stringify(parsed));

        }
    }


    return (
        <React.Fragment>
            <input type="text" placeholder={props.placeholder ? props.placeholder : "Search"} onChange={(event) => setSearchText(event.target.value)}
                defaultValue={props.defaultValue ? props.defaultValue : ""} onKeyDown={(event) => keyHanlder(event)}></input>
            <div className="search-result">
                {results.map((result) => {
                    return <div className="search-item">
                        <img src={searchIcon}></img>
                        <div>{result.title}</div>
                    </div>
                })}
            </div>
        </React.Fragment>);
}