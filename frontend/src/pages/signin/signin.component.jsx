import React from "react";
import {withRouter} from "react-router-dom";

import SignInContainer from "../../components/signin-container/signin-container.component";
import GeneratePasswordContainer from "../../components/generatepassword-container/generatepassword-container.component";

import "./signin.styles.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }
  
  checkAuth = ()=>{
    if(window.sessionStorage.getItem("token")){
      this.props.history.push('/main').then(()=>window.location.reload())
      return null
    }else{
      return this.component()
    }
  }

  signinHandle = () => {
    this.setState({ page: 0 });
  };

  generatePasswordHandle = () => {
    this.setState({ page: 1 });
  };

  component = () => {
      return<div>
        <div className="container-center">
        <div className="container-button-left">
          <button
            className={
              this.state.page === 0 ? "button-selected" : "button-default"
            }
            onClick={this.signinHandle}
          >
            Sign In
          </button>
          <button
            className={
              this.state.page === 1 ? "button-selected" : "button-default"
            }
            onClick={this.generatePasswordHandle}
          >
            Generate Password
          </button>
        </div>

        {this.state.page === 0 ? (
          <SignInContainer />
        ) : (
          <GeneratePasswordContainer />
        )}
      </div>
    </div>
  }

  render() {
      return this.checkAuth()
  }
}

export default withRouter(SignIn);
