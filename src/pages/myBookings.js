import React, { Component } from "react";
import firebase from "../components/FirebaseConfig";

import CardBooking from "../components/Card_booking";

class myBookings extends Component {
  state = {
    user: this.props.location.state.user,
    userBookings: [],
  };

  componentDidMount() {
    const db = firebase.firestore();

    db.collection("customerBookings")
      .where("user", "==", this.state.user.toString())
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data);
        this.setState({ userBookings: data });
      });
  }

  render() {
    return (
      <div className={"bookings"}>
        {this.state.userBookings.map((booking, index) => (
          <CardBooking
            key={index}
            title={booking.productName}
            date={booking.date}
            time={booking.time}
            price={booking.price}
            link={"/Book"}
            label={"Ändra bokning"}
          />
        ))}
      </div>
    );
  }
}

export default myBookings;
