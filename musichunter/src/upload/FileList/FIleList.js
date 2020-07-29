import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import cameraIcon from './../../icons/cameraIcon.png';

import './FileList.scss';
import 'react-datepicker/dist/react-datepicker.css'

const playlistTypeOptions = [
    { value: 'Playlist', label: 'Playlist' },
    { value: 'Album', label: 'Album' },
    { value: 'EP', label: 'EP' },
    { value: 'Single', label: 'Single' },
]

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
                <div className="buttons">
                    <button>Save</button>
                    <button>Cancel</button>
                </div>
            </div>
            <input id="file-upload" type="file" multiple={false} onChange={(e) => onFileSelect(e)}></input>
        </div>

    </div>);

}

export default FileList;