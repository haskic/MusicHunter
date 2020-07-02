import React from 'react';
import "./scss/HomePage.scss";

import Table from './Table';
import Container from './Container';
import SignalRContext from '../NotificationsContext';
import Category from './Category/Category';
// console.log("STORE =", store.getState().isLogin);
function HomePage(props) {
    return (
        <div className="home-page">
            {/* <div className="alexander">Alexander and Vladick {store.getState().isLogin}
                {SignalRContext.name}
            </div> */}
            {/* <Container></Container>
            <Table></Table> */}
            <Category></Category>
        </div>

    );
}

export default HomePage;