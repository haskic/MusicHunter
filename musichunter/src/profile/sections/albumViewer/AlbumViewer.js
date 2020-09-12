import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import API from './../../api/api';
import Album from './Album';

import default_song from './../../../song.mp3';
import default_cover from './../../../yelawofCover.jpg';

const default_album = {
    name: "IGOR 2019",
    artist: "Tyler the creator",
    imageUrl: default_cover,
    hash: "123123141532album",
    tracks: [
        { name: "IGOR'S THEME", artist: "Tyler the creator", imageUrl: default_cover, hashUrl: default_song, listens: 1337, hash: "albumtrack1" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", imageUrl: default_cover, hashUrl: default_song, listens: 1337, hash: "albumtrack2" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", imageUrl: default_cover, hashUrl: default_song, listens: 1337, hash: "albumtrack3" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", imageUrl: default_cover, hashUrl: default_song, listens: 1337, hash: "albumtrack4" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", imageUrl: default_cover, hashUrl: default_song, listens: 1337, hash: "albumtrack5" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", imageUrl: default_cover, hashUrl: default_song, listens: 1337, hash: "albumtrack6" }
    ]
}
const default_album2 = {
    name: "IGOR 2019",
    artist: "Tyler the creator",
    imageUrl: default_cover,
    hash: "123123141532album12",
    tracks: [
        { name: "IGOR'S THEME", artist: "Tyler the creator", imageUrl: default_cover, hashUrl: default_song, listens: 1337, hash: "albumtrack1" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", imageUrl: default_cover, hashUrl: default_song, listens: 1337, hash: "albumtrack2" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", imageUrl: default_cover, hashUrl: default_song, listens: 1337, hash: "albumtrack3" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", imageUrl: default_cover, hashUrl: default_song, listens: 1337, hash: "albumtrack4" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", imageUrl: default_cover, hashUrl: default_song, listens: 1337, hash: "albumtrack5" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", imageUrl: default_cover, hashUrl: default_song, listens: 1337, hash: "albumtrack6" }
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