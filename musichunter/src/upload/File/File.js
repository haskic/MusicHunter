import React from 'react';

import fileStyle from './File.scss';



function File(props) {

    return (<div className="file" style={fileStyle.file}>
        <div className="track-cover">
            <img src={props.fileData.image}></img>
        </div>
        <div className="track-info">
            <label for="track-title"><span>Title</span><input name="track-title" type="text" value={props.fileData.title}></input></label>
            <label for="track-genre">Genre<input name="track-genre" type="text" value={props.fileData.genre}></input></label>
            <label for="track-description">Description<textarea name="track-description"></textarea></label>
            <div className="buttons">
                <button>Save</button>
                <button>Cancel</button>
            </div>

        </div>
    </div>);

}

export default File;