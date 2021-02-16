import React from "react";

import { OtherCard, AdminCard } from "../../components/card/card.component";

import "./main.styles.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role:'',
      name:'',
      phone:'',
      component:[],
      loading:<h1>Loading..</h1>
    }
    this.MakeCard();
  }

  MakeCard = () => {
    let token = window.sessionStorage.getItem("token");
    if(token){
      fetch('http://127.0.0.1:5001/validatetoken',{
        method: "get",
        headers: { 
          "Content-Type": "application/json",
        "Authorization" : token }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({role:data.role, name:data.name, phone:data.phone})
        console.log('abc')
        fetch('http://127.0.0.1:5001/rawdata',{
          method: "get",
          headers: { 
            "Content-Type": "application/json",
          "Authorization" : token }
        })
        .then(response=>response.json())
        .then(data=>{
          let tempData = data;
          let array = tempData.map((rawData, index)=>this.state.role.toLowerCase()==='admin'?<AdminCard key={index} data={rawData}/>:<OtherCard key={index} data={rawData}/>)
          // console.log(array)

          this.setState({component:array})
        })
      })
    }
  };
  // this.MakeCard()
  render() {
    return (
      <div>
        <h1>{`${this.state.name}|${this.state.role}|${this.state.phone}`}</h1>
        <div>
          {(this.state.component)?<div className="container-style">{this.state.component}</div>:<div><h1>Loading...</h1></div>}
        </div>
      </div>
    );
  }
}

export default SignIn;
