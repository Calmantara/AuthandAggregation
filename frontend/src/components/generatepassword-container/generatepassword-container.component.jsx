import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./generatepassword-container.styles.css";

class GeneratePasswordContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      role: "",
      password: "",
      status: 0
    };
  }

  handleSubmit = () => {
    //this will be used to fetch the API
    fetch("http://localhost:5000/generatepassword", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        phone: this.state.phone,
        role: this.state.role
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ password: data.password, status: data.status });
        console.log(data);
      })
      .catch(err => console.log("error"));
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>Generate Password</h2>
        <div>
          <FormInput
            name="name"
            type="text"
            handleChange={this.handleChange}
            value={this.state.name}
            label="Name"
            required
          />
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
            name="role"
            type="text"
            handleChange={this.handleChange}
            value={this.state.role}
            label="Role"
            required
          />
          <div className="button-center">
            <CustomButton onClick={this.handleSubmit}>
              {" "}
              Generate Password{" "}
            </CustomButton>
          </div>
        </div>
        {this.state.status === 1 ? (
          <h5>{"Your password is " + this.state.password}</h5>
        ) : this.state.status === 2 ? (
          <h5>{"This account has already registered"}</h5>
        ) : null}
      </div>
    );
  }
}

export default GeneratePasswordContainer;
