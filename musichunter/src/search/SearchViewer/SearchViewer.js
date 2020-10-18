import React, { useState } from 'react';

import './scss/SearchViewer.scss';

const menuItems = [
    {
        text: "Everything"
    },
    {
        text: "Tracks"
    },
    {
        text: "People"
    },
    {
        text: "Albums"
    },
    {
        text: "Playlists"
    }
]


function SearchViewer(props) {

    const [selectedMenuItem, setSelectedMenuItem] = useState(0);

    return (
        <div className="search-page">
            <div className="search-page-container">
                <div className="top-search-title">Search results for "{props.searchText}"</div>
                <div className="search-page-container-subcontainer">
                    <div className="search-left-menu">
                        <div className="menu">
                            <ul>
                                {menuItems.map((item, index) => {
                                    return <li onClick={() => setSelectedMenuItem(index)}>
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
                        search content
                    </div>
                </div>
            </div>
        </div>);


}





export default SearchViewer;