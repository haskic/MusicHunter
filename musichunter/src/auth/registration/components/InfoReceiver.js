import React, { useState } from 'react';




const inputStyles = {
    marginBottom: '10px'
}
const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
}


function InfoReceiver(props) {

    const [receiverInfo, setReceiverInfo] = useState({});

    function acceptHander() {
        if (props.onSuccess) {
            props.onSuccess(receiverInfo);
        }
    }
    function setInfo(propertyString, value) {
        setReceiverInfo({ ...receiverInfo, ...{ [propertyString]: value } });
    }
    return (<div style={{paddingTop: '100px'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px', fontSize: '20pt', fontWeight: '600'}}>Enter Information</div>
        <label for="name-input" style={inputStyles}>
            <input type="text" name="name-input" placeholder="Enter your name" autoComplete="off" onChange={(e) => { setInfo("name", e.target.value) }}></input>
        </label>
        <label for="lastname-input">
            <input type="text" name="lastname-input" placeholder="Enter your lastname" autoComplete="off" onChange={(e) => { setInfo("lastname", e.target.value) }}></input>
        </label>
        <button style={buttonStyle} onClick={acceptHander}>Accept</button>
    </div>);
}


export default InfoReceiver;