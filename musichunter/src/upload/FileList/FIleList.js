import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as mm from 'music-metadata-browser';
import ProgressBar from './../uploadProgressBar/ProgressBar';
import axios from 'axios';
import API from './../api';
import animator from './../../animation/animator';

import usePlaylistInfo from './usePlaylistInfo';

import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import cameraIcon from './../../icons/cameraIcon.png';
import menuIcon from './../../icons/menuIcon.png';
import crossIcon from './../../icons/cross.png';

import token from './../../testData/token';

import './FileList.scss';
import 'react-datepicker/dist/react-datepicker.css'

const playlistTypeOptions = [
    { value: 'playlist', label: 'Playlist' },
    { value: 'album', label: 'Album' },
    { value: 'ep', label: 'EP' },
    { value: 'single', label: 'Single' },
]
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));
const testDragItems = [
    { id: "1", content: "Alexander1" },
    { id: "2", content: "Alexander2" },
    { id: "3", content: "Alexander3" },
    { id: "4", content: "Alexander4" },
    { id: "5", content: "Alexander1" },
    { id: "6", content: "Alexander2" },
    { id: "7", content: "Alexander3" },
    { id: "8", content: "Alexander4" },
    { id: "9", content: "Alexander1" },
    { id: "10", content: "Alexander2" },
    { id: "11", content: "Alexander3" },
    { id: "12", content: "Alexander4" },
]
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: "rgb(242,242,242)",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    padding: grid,
    width: "100%"
});

const reactSelectStyles = {
    container: (provided, state) => ({
        ...provided,
        padding: 0,
        height: 'fit-content',
        zIndex: 4
    }),
    control: (provided, state) => ({
        ...provided,
        minHeight: 'fit-content',
        height: 'fit-content'
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '27px'
    }),
    input: (provided, state) => ({
        ...provided,
        height: '22px',
    })
};

function FileList(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [fileList, setfileList] = useState([]);
    const [progressState, setProgressState] = useState({});
    const [hashes, setHashes] = useState([]);
    const playlistInfo = usePlaylistInfo({ title: "", genre: "", playlistType: "playlist", description: "" });
    // let callBack = React.useMemo((hashString,file) => {
    //     hashUpdater({id: file.id, hash: hashString});
    //     setProgressState({ ...progressState, [file.id]: 100 });
    // },[hashes]);
    useEffect(() => {
        playlistInfo.setPlaylistInfo(startDate, "date");
        if (props.files) {
            let newFilelist = [];
            for (let index = 0; index < props.files.length; index++) {
                let musicFile = new Blob([props.files[index]]);
                mm.parseBlob(musicFile).then(metadata => {
                    console.log('Metadata: ', metadata);

                    // const blob = new Blob([metadata.common.picture[0].data], { type: metadata.common.picture[0].format });
                    // const url = window.URL.createObjectURL(blob);
                    // const img = document.getElementById('song-image');
                    // img.src = url;
                    const fileData = {
                        title: metadata.common.title,
                        year: metadata.common.year,
                        album: metadata.common.album,
                        artist: metadata.common.artist,
                        comment: metadata.common.comment,
                        genre: metadata.common.genre[0],
                    }
                    sendFile({ id: index, entity: props.files[index] });
                    newFilelist.push({ id: index.toString(), content: props.files[index].name, fileData: fileData })
                    console.log("NewFileList: ", newFilelist);
                });
            }
            setfileList(newFilelist);
        }
    }, [])
    function onFileSelect(event) {
        let files = event.target.files;
        if (FileReader && files.length) {
            let fr = new FileReader();
            fr.onload = function () {
                document.getElementById("album-cover").src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        }
        playlistInfo.setPlaylistInfo(files[0], "image");
    }
    function maxIdinObjectArray(objArray) {
        let maxValue = 0;
        objArray.forEach(element => {
            if (parseInt(element.id) > maxValue) {
                maxValue = parseInt(element.id);
            }
        });
        return maxValue;
    }
    async function onFileAdd(event) {
        let files = event.target.files;

        console.log("FILES:", files);
        let newFileList = [];
        let maxIndex = maxIdinObjectArray(fileList);
        let lastFileIndex = fileList.length ? maxIndex : 0;
        for (let i = 0; i < files.length; i++) {
            lastFileIndex++;

            let musicFile = new Blob([files[i]]);
            await mm.parseBlob(musicFile).then(metadata => {
                console.log('Metadata: ', metadata);

                // const blob = new Blob([metadata.common.picture[0].data], { type: metadata.common.picture[0].format });
                // const url = window.URL.createObjectURL(blob);
                // const img = document.getElementById('song-image');
                // img.src = url;
                const fileData = {
                    title: metadata.common.title,
                    year: metadata.common.year,
                    album: metadata.common.album,
                    artist: metadata.common.artist,
                    comment: metadata.common.comment,
                    genre: metadata.common.genre[0],
                }

                newFileList.push({ content: files[i].name, id: lastFileIndex.toString(), fileData: fileData });
                sendFile({ id: lastFileIndex, entity: files[i] });
                // console.log("NewFileList: ", newFilelist);
            });



        }
        console.log("File ADD [EVENT] fileList after change: ",[...fileList,...newFileList]);
        setfileList([...fileList,...newFileList]);
    }
    function hashUpdater(newHashObj) {
        setHashes(prevState => [...prevState, newHashObj]);
        console.log("HASH LIST:", hashes);
    }
    function sendFile(file) {
        const formData = new FormData();
        formData.append("files", file.entity);
        API.sendFile(formData, token, (progressEvent) => {
            console.log("Progress", progressEvent.loaded);
            setProgressState({ ...progressState, [file.id]: progressEvent.loaded * 100 / file.entity.size });
        }, (res) => {
            setHashes(prevState => [...prevState, { id: file.id, hash: res.data.hash }]);
            console.log("HASH LIST:", hashes);
        });
    }
    function addFileToFileList(file) {
        setfileList([...fileList, file]);
    }

    function saveAndLoad() {
        const fileInput = document.getElementById("file-upload");
        const fileFromFileInput = fileInput.files[0];
        let fileOne = new Blob([fileFromFileInput]);
        console.log("File = ", fileFromFileInput, fileOne);

        const formData = new FormData();
        for (var i = 0; i < fileInput.files.length; i++) {
            formData.append("files", fileInput.files[i]);
        }
    }
    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            fileList,
            result.source.index,
            result.destination.index
        );

        setfileList(items);
    }
    function successAnimation() {
        animator.animate(document.getElementsByClassName("slide-1")[0], "hide-animated");
        animator.animate(document.getElementsByClassName("slide-2")[0], "nextSlide-animated");
        setTimeout(() => {
            document.getElementsByClassName("slide-1")[0].style.display = "none";
        }, 500);
    }
    function saveButtonHandler() {
        let tracklist = [];

        fileList.forEach((value, index) => {
            tracklist.push({ Name: value.fileData.title, Artist: value.fileData.title, Hash: hashes[index].hash, OwnerId: 13 });
        });
        let playlistobj = {
            Name: playlistInfo.playlistInfo.title,
            Type: playlistInfo.playlistInfo.playlistType,
            OwnerId: 112,
            ImageUrl: "",
        };
        console.log("TRACKLIST:", tracklist);
        API.addTracks(tracklist, token, () => {
            const imageFormData = new FormData();
            imageFormData.append("files", playlistInfo.playlistInfo.image);
            API.uploadImage(imageFormData, token, null, (response) => {
                playlistobj.ImageUrl = response.data.hashUrl;
                API.addPlaylist(playlistobj, token, (response) => {
                    let relations = [];
                    tracklist.forEach((value) => {
                        relations.push({ TrackHash: value.Hash, PlaylistHash: response.data.hash });
                    });
                    API.addPlaylistRelations(relations, token, (response) => {
                        console.log("RELATIONS: " + response.data.message);
                        if (response.data.status) {
                            successAnimation();
                        }

                    });
                });
            });
        });

    }

    return (<div className="file-list">
        <div className="file-list-title">Playlist</div>
        <div className="track-data">
            <div className="track-cover">
                <img id="album-cover">
                </img>
                <label for="file-upload" className="custom-file-upload"><img src={cameraIcon}></img> Update image</label>
            </div>
            <div className="track-info">
                <label for="track-title"><span>Title</span><input name="track-title" type="text" onChange={(e) => playlistInfo.setPlaylistInfo(e.target.value, "title")}></input></label>
                <div className="playlist-type-date">
                    <label for="playlist-type" className="description-label">Playlist type
                    <Select
                            options={playlistTypeOptions}
                            styles={reactSelectStyles}
                            isSearchable={false}
                            defaultValue={playlistTypeOptions[0]}
                            onChange={item => { playlistInfo.setPlaylistInfo(item.value, "playlistType") }}
                        >
                        </Select>
                    </label>
                    <label for="playlist-type" className="description-label">Release
                    <div className="date-picker-container">
                            <DatePicker
                                closeOnScroll={true}
                                selected={startDate}
                                onChange={date => { setStartDate(date); playlistInfo.setPlaylistInfo(date, "date") }}
                                className="release-date"
                            ></DatePicker>
                        </div>

                    </label>

                </div>

                <label for="track-genre">Genre<input name="track-genre" type="text" onChange={(e) => playlistInfo.setPlaylistInfo(e.target.value, "genre")}></input></label>
                <label for="track-description" className="description-label">Description<textarea name="track-description" onChange={(e) => playlistInfo.setPlaylistInfo(e.target.value, "description")}></textarea></label>
                <div className="privacy-block">
                    <div>Privacy:</div>
                    <label><input type="radio" name="privacy" checked></input>Public</label>
                    <label><input type="radio" name="privacy"></input>Private</label>
                </div>
                <div className="files-drag-drops-container">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    {fileList.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <div className="files-file-item">
                                                        <div className="progress-bar">
                                                            <ProgressBar progress={progressState[item.id]}></ProgressBar>
                                                        </div>
                                                        <div className="file-info">
                                                            <div className="image-container">
                                                                <img src={menuIcon}></img>
                                                            </div>
                                                            <input type="text" value={item.content}></input>
                                                            <div className="delete-button-container" onClick={() => setfileList(fileList.filter((value) => { return value.id !== item.id }))}>
                                                                <img src={crossIcon}></img>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <div className="add-button-container">
                    <label for="music-file-upload" className="custom-file-upload">Add File</label>
                </div>
                <div className="buttons">
                    <button onClick={() => saveButtonHandler()}>Save</button>
                    <button onClick={() => { console.log("HASH ARR = ", hashes) }}>Cancel</button>
                </div>

            </div>
            <input id="file-upload" type="file" multiple={false} onChange={(e) => onFileSelect(e)}></input>
            <input id="music-file-upload" type="file" multiple={true} onChange={(e) => onFileAdd(e)}></input>
        </div>

    </div>);

}

export default FileList;