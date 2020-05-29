import React, { Component } from "react";
import Card from "../components/Card_full";
import axios from "axios";

class Main extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    axios.get("http://localhost:1337/products").then((res) => {
      this.setState({ products: res.data });
    });
  }

  render() {
    return (
      <div className={"products"}>
        {this.state.products.map((product) => (
          <Card
            key={product.id}
            docId={product.id}
            title={product.title}
            desc={product.description}
            price={product.price}
            image={"http://localhost:1337" + product.image.url}
            label={"Boka"}
            link={"/Book"}
          />
        ))}
      </div>
    );
  }
}

export default Main;
