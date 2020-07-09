import React from 'react';
import Album from './Album';

import default_song from './../../../song.mp3';
import default_cover from './../../../yelawofCover.jpg';

const default_album = {
    name: "IGOR 2019",
    artist: "Tyler the creator",
    coverImage: default_cover,
    hash: "123123141532album",
    tracklist: [
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337, hash: "albumtrack1" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337, hash: "albumtrack2" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337, hash: "albumtrack3" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337, hash: "albumtrack4" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337, hash: "albumtrack5" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337, hash: "albumtrack6" }
    ]
}
const default_album2 = {
    name: "IGOR 2019",
    artist: "Tyler the creator",
    coverImage: default_cover,
    hash: "123123141532album12",
    tracklist: [
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337, hash: "albumtrack1" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337, hash: "albumtrack2" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337, hash: "albumtrack3" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337, hash: "albumtrack4" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337, hash: "albumtrack5" },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337, hash: "albumtrack6" }
    ]
}


function AlbumViewer(){

    return(<div className="album-viewer">
        <Album album={default_album}></Album>
        <Album album={default_album2}></Album>

    </div>);

}

export default AlbumViewer;