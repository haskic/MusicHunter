import React from 'react';
import { ReactReduxContext,connect } from 'react-redux';


function Container(props){
    function handlezhakar() {
        props.changeIslogin("BOING");
    }
    return(
        <ReactReduxContext.Consumer>
        {({ store }) => 
        <React.Fragment>
<div>POWER OF ZHAKAR = {store.getState().isLogin}</div>
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
)(Container);