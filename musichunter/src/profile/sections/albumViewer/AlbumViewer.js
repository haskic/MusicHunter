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
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337 },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337 },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337 },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337 },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337 },
        { name: "IGOR'S THEME", artist: "Tyler the creator", coverImage: default_cover, src: default_song, listens: 1337 }
    ]
}


function AlbumViewer(){

    return(<div className="album-viewer">
        <Album album={default_album}></Album>
        <Album album={default_album}></Album>

    </div>);

}

export default AlbumViewer;