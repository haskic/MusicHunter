import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Track from './../../profile/sections/trackViewer/Track';
import { connect } from 'react-redux';
import queryString from 'query-string';
import API from './../api/api';

import './scss/SearchViewer.scss';

const menuItems = [
    {
        text: "Everything",

    },
    {
        text: "Tracks",

    },
    {
        text: "People",

    },
    {
        text: "Albums",

    },
    {
        text: "Playlists",

    }
]


function SearchViewer(props) {
    const [selectedMenuItem, setSelectedMenuItem] = useState(0);
    const [results, setResults] = useState([]);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        console.log("LOCATION = ", JSON.stringify(props.location, null, 2));
        const parsed = queryString.parse(props.location.search);
        console.log("LOCATION = ", parsed);
        API.searchByText(parsed.line, props.store.currentUser.token, (response) => {

            console.log("Response: ", JSON.parse(response.data.tracks));
            setResults(JSON.parse(response.data.tracks));
        });
    }, [location])

    function menuHanlder(menuItem) {
        const parsed = queryString.parse(props.location.search);
        parsed.section = menuItem.text;
        history.push("/search?" + queryString.stringify(parsed));
        console.log("MENU HANDLER");
    }

    function setPlaylistByTrack(trackIndex) {
        props.changePlaylist({
            tracks: results,
            name: `Tracks of User ${props.userHash}`,
            type: 'playlist',
            hash: `tracks${props.userHash}`,

        });
        console.log("TRACK INDEX = = = = = = = ", trackIndex);
        props.changePlaylistCounter(trackIndex);
    }
    return (
        <div className="search-page">
            <div className="search-page-container">
                <div className="top-search-title">Search results for "{props.searchText}"</div>
                <div className="search-page-container-subcontainer">
                    <div className="search-left-menu">
                        <div className="menu">
                            <ul>
                                {menuItems.map((item, index) => {
                                    return <li onClick={() => { setSelectedMenuItem(index); menuHanlder(item); }}>
                                        <div className={index == selectedMenuItem ? "menu-item-selected" : "menu-item"}>{item.text}</div>
                                        {index == selectedMenuItem ? <div class="arrow-right"></div> : null}

                                    </li>
                                })}
                            </ul>
                        </div>
                        <div className="search-left-menu-description">
                            <div className="language-button">Language:</div>
                            <div className="language-selected">English (US)</div>
                        </div>
                    </div>
                    <div className="search-content">
                        {results.map((value, index) => {
                            console.log("IMAGE URL =", value.ImageUrl);
                            return <Track track={value} index={index} clickHandler={(trackIndex) => setPlaylistByTrack(trackIndex)}></Track>
                        })}
                    </div>
                </div>
            </div>
        </div>);


}





export default connect(
    state => ({ store: state }),
    dispatch => ({
        changePlaylist: (value) => {
            dispatch({ type: 'SET_PLAYLIST', playlist: value })
        },
        changePlaylistCounter: (value) => {
            dispatch({ type: 'PLAYLIST_SET_COUNTER', counterValue: value })
        },

    })
)(SearchViewer);