import React from 'react';
import "./scss/HomePage.scss";

import Table from './Table';
import Container from './Container';
import SignalRContext from '../NotificationsContext';
import Category from './Category/Category';
import Slider from '../slider/Slider';
// console.log("STORE =", store.getState().isLogin);
let content = ["Alexander", "Vladick", "Alexey", "Masha"];
function HomePage(props) {
    return (
        <div className="home-page">
            <div className="homepage-container">
                {/* <div className="alexander">Alexander and Vladick {store.getState().isLogin}
                {SignalRContext.name}
            </div> */}
                {/* <Container></Container>
            <Table></Table> */}
                <Category></Category>
                <div className="sidebar-right"></div>
                {/* <Slider width="800px" slides={content} infinity={false}></Slider>
            <Slider width="1000px" height="200px"></Slider> */}
            </div>


        </div>

    );
}

export default HomePage;