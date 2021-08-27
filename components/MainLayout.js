import React from "react";
import Head from "../Partials/Header";
import Footer from "../Partials/Footer";

class MainLayout extends React.Component {
  render() {
    return (
      <>
        <Footer></Footer>
        <div className="public-page">{this.props.children}</div>
        <Head></Head>
      </>
    );
  }
}

export default MainLayout;
