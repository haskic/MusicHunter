import React,{useState} from 'react';
import { connect } from 'react-redux';



function ProfileEditor(props) {
    const [nameIntput, setNameIntput] = useState();
    const [locationInput, setLocationInput] = useState();
    const [profileImage, setProfileImage] = useState();
    return (
        <div>
            <div className="edit-photo">
                <img></img>
            </div>
            <div className="edit-info">
                <label>Name
                <input type="text"></input>
                </label>
                <label>Location
                <input type="text"></input>
                </label>
                <label>Status
                    <input type="text"></input>
                </label>

            </div>

        </div>
    );

}



export default ProfileEditor;