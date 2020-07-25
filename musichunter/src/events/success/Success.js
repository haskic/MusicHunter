import React from 'react';

import checkMarkIcon from './../icons/checkMark.png';

import success from './Success.scss';


export default function Success(props) {
    return (
        <div className="event-success-1" style={success["event-success-1"]}>
            <div className="event-container">
                <div className="header">
                    <div className="title">
                        {props.title}
                    </div>
                    <div className="image">
                        <img src={checkMarkIcon}>
                        </img>
                    </div>
                </div>
                <div className="footer">
                    <div className="bottom-text">
                        {props.text}
                    </div>
                    {props.attachment()}
                </div>

            </div>

        </div>);

}