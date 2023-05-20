import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { isMoblile } from "../Utils/HardCoded";

export default function PageTemplate({ graph, control }) {
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: isMoblile ? "1fr" : "370px 1fr",
    gridTemplateRows: isMoblile ? "160px 400px 1fr 100px" : "80px 1fr 100px",
    gridTemplateAreas: isMoblile
      ? `
    "navbar "
    "sidebar" 
    "main"
    "footer "
  `
      : `
          "navbar navbar"
          "sidebar main"
          "footer footer"
        `,
    height: isMoblile ? "auto" : "100vh",
  };

  const navbarStyle = {
    gridArea: "navbar",
    height: isMoblile ? "160px" : "80px",
  };

  const sidebarStyle = {
    gridArea: "sidebar",
    width: isMoblile ? "100%" : "370px",
    height: isMoblile ? "auto" : "calc(100vh - 161px)",
    // overflow: isMoblile ? "scroll" : "auto",
  };

  const mainStyle = {
    gridArea: "main",
    height: "auto",
  };

  const footerStyle = {
    gridArea: "footer",
    height: isMoblile ? "120px" : "80px",
  };

  return (
    <div style={containerStyle}>
      <div style={navbarStyle}>
        <Navbar />
      </div>
      <div style={sidebarStyle}>{control}</div>
      <div style={mainStyle}>{graph}</div>
      <div style={footerStyle}>{/* <Footer /> */}</div>
    </div>
  );
}
