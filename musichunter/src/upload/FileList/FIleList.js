import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import cameraIcon from './../../icons/cameraIcon.png';
import menuIcon from './../../icons/menuIcon.png';
import crossIcon from './../../icons/cross.png';

import './FileList.scss';
import 'react-datepicker/dist/react-datepicker.css'

const playlistTypeOptions = [
    { value: 'Playlist', label: 'Playlist' },
    { value: 'Album', label: 'Album' },
    { value: 'EP', label: 'EP' },
    { value: 'Single', label: 'Single' },
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
const testDragItems2 = [
    { id: 1, content: "Alexander1" },
    { id: 2, content: "Alexander2" },
    { id: 3, content: "Alexander3" },
    { id: 4, content: "Alexander4" },
    { id: 5, content: "Alexander1" },
    { id: 6, content: "Alexander2" },
    { id: 7, content: "Alexander3" },
    { id: 8, content: "Alexander4" },
    { id: 9, content: "Alexander1" },
    { id: 10, content: "Alexander2" },
    { id: 11, content: "Alexander3" },
    { id: 12, content: "Alexander4" },
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
    const [fileList, setfileList] = useState(testDragItems);
    function onFileSelect(event) {
        let files = event.target.files;
        if (FileReader && files.length) {
            let fr = new FileReader();
            fr.onload = function () {
                document.getElementById("album-cover").src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        }
    }

    function onFileAdd(event) {
        let files = event.target.files;
        console.log("FILES:",files);
        let toFileListState = [];
        let lastFileIndex = fileList.length ? parseInt(fileList[fileList.length - 1].id) : 0;
        for (let i = 0; i < files.length; i++) {
            lastFileIndex++;
            toFileListState.push({ content: files[i].name, id: lastFileIndex.toString() })
        }
        console.log("TO STATE:",toFileListState);

        if (toFileListState != false) {
            setfileList([...fileList,...toFileListState]);
        }
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

    return (<div className="file-list">
        <div className="track-data">
            <div className="track-cover">
                <img id="album-cover">
                </img>
                <label for="file-upload" className="custom-file-upload"><img src={cameraIcon}></img> Update image</label>
            </div>
            <div className="track-info">
                <label for="track-title"><span>Title</span><input name="track-title" type="text" ></input></label>
                <div className="playlist-type-date">
                    <label for="playlist-type" className="description-label">Playlist type
                    <Select
                            options={playlistTypeOptions}
                            styles={reactSelectStyles}
                            isSearchable={false}
                            defaultValue={playlistTypeOptions[0]}
                        >
                        </Select>
                    </label>
                    <label for="playlist-type" className="description-label">Description
                    <div className="date-picker-container">
                            <DatePicker
                                closeOnScroll={true}
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                className="release-date"
                            ></DatePicker>
                        </div>

                    </label>

                </div>

                <label for="track-genre">Genre<input name="track-genre" type="text" ></input></label>
                <label for="track-description" className="description-label">Description<textarea name="track-description"></textarea></label>
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
                                                        <div className="image-container">
                                                            <img src={menuIcon}></img>
                                                        </div>
                                                        <input type="text" value={item.content}></input>
                                                        <div className="delete-button-container" onClick={() => setfileList(fileList.filter((value) => { return value.id !== item.id }))}>
                                                            <img src={crossIcon}></img>
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
                    <button>Save</button>
                    <button>Cancel</button>
                </div>

            </div>
            <input id="file-upload" type="file" multiple={false} onChange={(e) => onFileSelect(e)}></input>
            <input id="music-file-upload" type="file" multiple={true} onChange={(e) => onFileAdd(e)}></input>
        </div>

    </div>);

}

export default FileList;