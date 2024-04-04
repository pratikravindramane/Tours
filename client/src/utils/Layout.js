import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
