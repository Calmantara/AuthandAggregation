import React from "react";
import { withRouter } from "react-router-dom";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./signin-container.styles.css";

class SignInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      message: "",
      status: 0,
    };
  }

  saveAuthTokenInSessions = (token) => {
    window.sessionStorage.setItem("token", token);
  };

  handleSubmit = () => {
    //this will be used to fetch the API
    fetch('http://127.0.0.1:5000/signin', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: this.state.phone,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
        //if valid
          this.saveAuthTokenInSessions(data.token);
          this.setState({
            phone:"",
            password:"",
            message: "",
            status: 0,
          });
          this.props.history.push('/main')
        }else{
          this.setState({
            message: data.message,
            status: data.status,
          });
        }

      });
  };

  handleTest = () => {
    fetch("http://localhost:5000/rawdata", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    // console.log(name)
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>Sign In</h2>
        <div>
          <FormInput
            name="phone"
            type="tel"
            handleChange={this.handleChange}
            value={this.state.phone}
            label="Phone"
            pattern="[0-9]{12}"
            required
          />
          <FormInput
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.password}
            label="Password"
            required
          />
          <div className="button-center">
            {" "}
            <CustomButton onClick={this.handleSubmit}> Sign in </CustomButton>
          </div>
        </div>
        {this.state.status === 1 ? <h5>{this.state.message}</h5> : null}
      </div>
    );
  }
}

export default withRouter(SignInContainer);
