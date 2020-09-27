import React from 'react';

const defaultStyle = {
    color: 'red',
    paddingBottom: '10px'
}

function Error(props){
    return(
        <div style={ {...defaultStyle,...props.style}}>{props.message}</div>
    );
}


export default Error;