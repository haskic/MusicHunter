import React from 'react';
import "./scss/HomePage.scss";

import Table from './Table';
import Container from './Container';
import SignalRContext from '../NotificationsContext';
// console.log("STORE =", store.getState().isLogin);
function HomePage(props) {
    return (
        <React.Fragment>
            {/* <div className="alexander">Alexander and Vladick {store.getState().isLogin}
                {SignalRContext.name}
            </div> */}
            <Container></Container>
            <Table></Table>

        </React.Fragment>

    );
}

export default HomePage;