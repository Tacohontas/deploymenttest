import React, { Component } from "react";
import axios from "axios";

class EditProducts extends Component {
  state = {
    products: [],
    chosenProduct: [],
    status: null,
    image: "",
  };

  async componentDidMount() {
    axios.get("http://localhost:1337/products").then((res) => {
      this.setState({ products: res.data });
    });
  }
  componentDidUpdate() {
    if (Object.keys(this.state.chosenProduct).length > 0) {
      document.querySelector(
        'input[name="title"]'
      ).value = this.state.chosenProduct.title;
      document.querySelector(
        'textarea[name="description"]'
      ).value = this.state.chosenProduct.description;
      document.querySelector(
        'input[name="price"]'
      ).value = this.state.chosenProduct.price;
    }
  }

  onImgUploadChange(e) {
    // Put image in state
    this.setState({ image: e.target.files[0] });

    // Preview image
    let previewOutput = document.querySelector(".card_img-top");
    previewOutput.src = URL.createObjectURL(e.target.files[0]);
  }

  onClickChosenProduct(e) {
    let chosenProductId = e.target.getAttribute("data-key");
    axios
      .get("http://localhost:1337/products/" + chosenProductId)
      .then((res) => {
        this.setState({ chosenProduct: res.data });
      });
  }

  onClickAbort() {
    this.setState({ chosenProduct: [] });
  }

  onClickDelete(e) {
    const chosenProductId = e.target.getAttribute("data-key");
    axios({
      method: "delete",
      url: `http://localhost:1337/products/${chosenProductId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        console.log("Well done");
        console.log(response);
        console.log(response.status);
        // this.setState({ chosenProduct: [] });
        if (response.status === 200) {
          this.props.dataFromEditProducts("default", response.status, "Produkt borttagen"); // Skicka tillbaks användare till admin-landing
        }
      })
      .catch((error) => {
        console.log("An error occurred", error);
      });
  }

  onClickEnableUpload() {
    const fileInput = document.querySelector("#img__upload");
    fileInput.disabled = false;
  }

  async onSubmitToApi(e) {
    e.preventDefault();
    console.log(localStorage.getItem("jwt"));

    const fileInput = document.querySelector("#img__upload");

    

    // console.log(e.target.elements.id.value);

    if (!fileInput.disabled) {
      // fileInput is disabled if we don't want to update image.
      // Upload image
      console.log("input isnt disabled");

      const formData = new FormData();
      formData.append("files", this.state.image);
      formData.append("ref", "product"); // Refererar till table
      formData.append("refId", e.target.elements.id.value); // Hämtat post-id från vår post vi skapade.
      formData.append("field", "image"); // Refererar till column i vår table

      axios({
        method: "post",
        url: `http://localhost:1337/upload`,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((response) => {
          // Handle success
          console.log("Picture uploaded to post, Well done");
          console.log(response);
          console.log(response.status);
          this.setState({ status: response.status });
          console.log("from state:", this.state.status);
        })
        .catch((error) => {
          console.log("An error occurred", error);
        });
    }

    axios({
      method: "put",
      url: `http://localhost:1337/products/${e.target.elements.id.value}`,
      data: {
        title: e.target.elements.title.value,
        description: e.target.elements.description.value,
        price: e.target.elements.price.value,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        // Handle success
        console.log("Post created, Well done");
        console.log(response);
        console.log(response.status);
        // this.setState({ status: response.status });
        if (response.status === 200) {
          this.props.dataFromEditProducts("default", response.status, "Produkt ändrad"); // Skicka tillbaks användare till admin-landing
        }
      })
      .catch((error) => {
        console.log("An error occurred", error);
        // console.log(data);
      });
  }

  render() {
    return (
      <div>
        {/* Products */}
        {Object.keys(this.state.chosenProduct).length === 0 && (
          <div className={"products_preview"}>
            {this.state.products.map((product) => (
              <div className={"card__preview"} key={product.id}>
                <div className={"card__body"}>
                  <h3 className={"card__title"}>{product.title}</h3>
                  <p className={"card__price"}>{product.price}kr</p>
                  <button
                    className={"button__success"}
                    onClick={this.onClickChosenProduct.bind(this)}
                    data-key={product.id}
                  >
                    ändra
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chosen product */}
        {Object.keys(this.state.chosenProduct).length > 0 && (
          <div className={"chosenproduct"}>
            <h1>Vald produkt</h1>
            <form onSubmit={this.onSubmitToApi.bind(this)}>
              <img
                src={
                  "http://localhost:1337" + this.state.chosenProduct.image.url
                }
                className={"card_img-top"}
                alt={""}
              />
              <label
                htmlFor={"img__upload"}
                className={"button__secondary"}
                onClick={this.onClickEnableUpload.bind(this)}
              >
                Ändra bild
              </label>
              <input
                id={"img__upload"}
                type="file"
                name="file"
                onChange={this.onImgUploadChange.bind(this)}
                disabled
              />
              <input
                type="hidden"
                name="id"
                value={this.state.chosenProduct.id}
              />
              <input type="text" name="title" placeholder={"Enter new title"} />
              <textarea
                rows="5"
                type="text"
                name="description"
                placeholder={"Enter new description"}
              />
              <input
                type="number"
                name="price"
                placeholder={"Enter new price"}
              />

              <button className={"button__success"}>Spara ändringar</button>
            </form>
            <button
              className={"button__secondary"}
              onClick={this.onClickAbort.bind(this)}
            >
              Tillbaka
            </button>
            <button
              className={"button__warning"}
              onClick={this.onClickDelete.bind(this)}
              data-key={this.state.chosenProduct.id}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default EditProducts;
