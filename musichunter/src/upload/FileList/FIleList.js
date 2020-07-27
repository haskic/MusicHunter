import React from './node_modules/react';




function FileList(props){

    return(<div className="file-list">
        {props.files.map((file) => {
            return <div className=""></div>
        })}
    </div>);

}

export default FileList;