import {useState} from 'react';




function usePlaylistInfo(defaultValue){


    const [playlistInfo, setPlaylistInfo] = useState(defaultValue);


    function setPlaylist(value,valueType){
        let newValue = {...playlistInfo};
        newValue[valueType] = value;
        setPlaylistInfo(newValue);
        console.log("usePlaylistInfo:",newValue);
    }
    return {playlistInfo: playlistInfo, setPlaylistInfo: (value,valueType) => setPlaylist(value,valueType)};

}


export default usePlaylistInfo;