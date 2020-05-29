import React, { Component } from "react";
import axios from "axios";

class Adminform extends Component {

  async onSubmitToApi(e) {
    e.preventDefault();


    /* --- Lägga till resten av data --- */


    const res = await axios.post("http://localhost:1337/products", {
      title: e.target.elements.title.value,
      description: e.target.elements.description.value,
      price: e.target.elements.price.value,
      image: "tillfällig data"
    });

    console.log(res);
    

  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitToApi.bind(this)}>
          <input type="text" name="title" placeholder="title" />
          <input type="text" name="description" placeholder="description" />
          <input type="number" name="price" placeholder="price" />
          <input type="file" name="file" />
          <button>Spara</button>
        </form>
      </div>
    );
  }
}

export default Adminform;
