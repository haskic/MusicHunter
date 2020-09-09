import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import API from './../../api/api';
import Album from './Album';

import default_song from './../../../song.mp3';
import default_cover from './../../../yelawofCover.jpg';

const default_album = {
    Name: "IGOR 2019",
    Artist: "Tyler the creator",
    ImageUrl: default_cover,
    Hash: "123123141532album",
    Tracks: [
        { Name: "IGOR'S THEME", Artist: "Tyler the creator", ImageUrl: default_cover, HashUrl: default_song, listens: 1337, Hash: "albumtrack1" },
        { Name: "IGOR'S THEME", Artist: "Tyler the creator", ImageUrl: default_cover, HashUrl: default_song, listens: 1337, Hash: "albumtrack2" },
        { Name: "IGOR'S THEME", Artist: "Tyler the creator", ImageUrl: default_cover, HashUrl: default_song, listens: 1337, Hash: "albumtrack3" },
        { Name: "IGOR'S THEME", Artist: "Tyler the creator", ImageUrl: default_cover, HashUrl: default_song, listens: 1337, Hash: "albumtrack4" },
        { Name: "IGOR'S THEME", Artist: "Tyler the creator", ImageUrl: default_cover, HashUrl: default_song, listens: 1337, Hash: "albumtrack5" },
        { Name: "IGOR'S THEME", Artist: "Tyler the creator", ImageUrl: default_cover, HashUrl: default_song, listens: 1337, Hash: "albumtrack6" }
    ]
}
const default_album2 = {
    Name: "IGOR 2019",
    Artist: "Tyler the creator",
    ImageUrl: default_cover,
    Hash: "123123141532album12",
    Tracks: [
        { Name: "IGOR'S THEME", Artist: "Tyler the creator", ImageUrl: default_cover, HashUrl: default_song, listens: 1337, Hash: "albumtrack1" },
        { Name: "IGOR'S THEME", Artist: "Tyler the creator", ImageUrl: default_cover, HashUrl: default_song, listens: 1337, Hash: "albumtrack2" },
        { Name: "IGOR'S THEME", Artist: "Tyler the creator", ImageUrl: default_cover, HashUrl: default_song, listens: 1337, Hash: "albumtrack3" },
        { Name: "IGOR'S THEME", Artist: "Tyler the creator", ImageUrl: default_cover, HashUrl: default_song, listens: 1337, Hash: "albumtrack4" },
        { Name: "IGOR'S THEME", Artist: "Tyler the creator", ImageUrl: default_cover, HashUrl: default_song, listens: 1337, Hash: "albumtrack5" },
        { Name: "IGOR'S THEME", Artist: "Tyler the creator", ImageUrl: default_cover, HashUrl: default_song, listens: 1337, Hash: "albumtrack6" }
    ]
}


function AlbumViewer(props) {
    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        API.getPlaylists(props.store.currentUser.hash, props.store.currentUser.token, (res) => {
            setPlaylists(JSON.parse(res.data.playlists));  
            console.log("TRACK DATA = ", JSON.parse(res.data.playlists));
        });

    }, [])
    return (<div className="album-viewer">
        {/* <Album album={default_album}></Album> */}
        {/* <Album album={default_album2}></Album> */}
        {playlists.map((value) => {
            return <Album album={value}></Album>
        })}
    </div>);

}

export default connect(
    state => ({ store: state }),
)(AlbumViewer);