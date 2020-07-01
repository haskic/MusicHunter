import React from 'react';
import { ReactReduxContext,connect } from 'react-redux';
import SignalRContext from '../NotificationsContext';

function Table(props){
    function handlezhakar() {
        props.changeIslogin("BOING");
        SignalRContext.name = "Lox";
        console.log("VALUE  = ",SignalRContext.name);

    }
    return(
        <ReactReduxContext.Consumer>
        {({ store }) => 
        <React.Fragment>
<div>ZHAKAR {store.getState().isLogin}</div>
          <button onClick={handlezhakar}>CLick me</button>
        </React.Fragment>
          
        }
      </ReactReduxContext.Consumer>
    );
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        changeIslogin: (value) => {
            dispatch({type: 'ZHAKAR', isLogin: value})
        }
    })
)(Table);