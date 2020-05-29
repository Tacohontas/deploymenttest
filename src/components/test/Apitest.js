import React, { Component } from "react";
import axios from "axios";

class Apitest extends Component {
  state = { dataFromApi_title: "", image:"" };

  onClickApi() {
    axios
    .get("http://localhost:1337/products")
    .then((res) => {
        console.log(res);
        
      this.setState({ 
          dataFromApi_title: res.data[0].title,
          image: res.data[0].image.formats.thumbnail.url
         });
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickApi.bind(this)}>Hämta</button>
        {this.state.dataFromApi_title}
        {/* {this.state.image}  */}
        <img src={"http://localhost:1337"+this.state.image} alt=""></img>
      </div>
    );
  }
}

export default Apitest;
