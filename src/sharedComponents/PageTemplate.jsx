import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { footerHeight, isMoblile, navHeight } from "../Utils/HardCoded";

export default function PageTemplate({ graph, control }) {
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: isMoblile ? "1fr" : "370px 1fr",
    gridTemplateRows: isMoblile
      ? "160px 400px 1fr 100px"
      : `${navHeight}px 1fr ${footerHeight}px`,
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
    width: "100vw",
  };

  const navbarStyle = {
    gridArea: "navbar",
  };

  const sidebarStyle = {
    gridArea: "sidebar",
  };

  const mainStyle = {
    gridArea: "main",
  };

  const footerStyle = {
    gridArea: "footer",
  };

  return (
    <div style={containerStyle}>
      <div style={navbarStyle}>
        <Navbar />
      </div>
      <div style={sidebarStyle}>{control}</div>
      <div style={mainStyle}>{graph}</div>
      <div style={footerStyle}>
        <Footer />
      </div>
    </div>
  );
}
