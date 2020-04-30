// import React, { Component } from "react";

// export default class Loading extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       text: "loading",
//     };
//   }
//   componentDidMount() {
//     this.setLoading = setInterval(() => {
//       this.setState(({ text }) => {
//         if (this.state.text !== "loading...") {
//           return {
//             text: this.state.text + ".",
//           };
//         } else {
//           return {
//             text: "loading",
//           };
//         }
//       });
//     }, 300);
//   }

//   componentWillUnmount() {
//     clearInterval(this.setLoading);
//   }

//   render() {
//     return <span>{this.state.text}</span>;
//   }
// }
