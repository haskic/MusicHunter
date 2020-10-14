import React from 'react';

import playlistBlackIcon from './../icons/playlistBlack.png';
import playlistBlueIcon from './../icons/playlistBlue.png';





export default function PlaylistIcon(props) {
    const [playlistIcon, setPlaylistIcon] = React.useState(playlistBlackIcon);

    function playlistIconToggle() {
        if (playlistIcon == playlistBlackIcon) {
            setPlaylistIcon(playlistBlueIcon);
            return;
        }
        setPlaylistIcon(playlistBlackIcon);
    }


    return (<img src={playlistIcon} onMouseEnter={() => playlistIconToggle()} onMouseLeave={() => playlistIconToggle()} onClick={() => props.clickHandler()}></img>);
}