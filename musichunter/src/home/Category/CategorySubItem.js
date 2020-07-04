import React, { useState, useEffect } from 'react';
import playIcon from './../../bottomPlayer/icons/play2.png';
import heartIcon from './../../bottomPlayer/icons/heartBlue.png';


const defaultStyle = {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
}
const heartDefaultStyle = {
    position: 'absolute',
    right: '5px',
    bottom: '10px',
    width: '17px',
    height: '17px'
}

function CategorySubItem(props) {

    const [isHover, setisHover] = useState(false)

    function mouseEnterHander() {
        setisHover(true);
    }
    function mouseLeaveHandler() {
        setisHover(false);
    }
    return (<div className="category-carusel-item">
        <div className="category-carusel-item-album-cover" onMouseEnter={mouseEnterHander} onMouseLeave={mouseLeaveHandler}>
            <img src={props.albumCover}></img>
            {isHover ? <React.Fragment>
                <img style={defaultStyle} src={playIcon} ></img>
                <img src={heartIcon} style={heartDefaultStyle}></img>
            </React.Fragment> : null}
        </div>
        <div className="category-carusel-item-title">{props.title}</div>
        <div className="category-carusel-item-description">{props.description}</div>
    </div>)
}

export default CategorySubItem;