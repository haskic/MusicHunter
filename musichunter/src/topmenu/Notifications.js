import React, { useState } from 'react';
import SignalRContext from './../signalRContext';
import notifactionsLogo from './logo/notifications.png';

let default_notifications = [<div className="top-menu-container-notifications-list-container-notification">Notification 1 </div>,
<div className="top-menu-container-notifications-list-container-notification">Notification 2 </div>]



function Notifications() {
    const [notificationsCount, setNotificationsCount] = useState(16);
    const [notificationsIsShow, setNotificationsIsShow] = useState(false)
    const [notifactionsList, setNotificationsList] = useState(default_notifications);
    SignalRContext.connection.on("GetLol", function (textResponse) {
        console.log("RESPONSE COLOKOL");
        setNotificationsList([...notifactionsList,<div className="top-menu-container-notifications-list-container-notification">Notification lol </div>])
    });
    function notificationsButtonHandler(event) {
        console.log("CLICK KOLOCOL");
        setNotificationsIsShow(notificationsIsShow ? false : true);
    }




    return (
        <div className="top-menu-container-notifications">
            <img src={notifactionsLogo} onClick={(e) => notificationsButtonHandler(e)}></img>
            <div className="top-menu-container-notifications-counter">{notificationsCount}</div>
            {notificationsIsShow ? <div className="top-menu-container-notifications-list-container">
                {notifactionsList}
                {notifactionsList.length == 0 ? <div> No activities</div> : null}
            </div> : null}

        </div>
    );
}

export default Notifications;