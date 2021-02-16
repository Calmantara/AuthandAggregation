import React from 'react';
import {withRouter} from 'react-router-dom';

const Router = (props) =>{
    if(window.sessionStorage.getItem("token")){
        props.history.push('/main')
        return null
      }else{
        props.history.push('/signin')
        return null
      }
      <div></div>
}

export default withRouter(Router)
