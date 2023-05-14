import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageTemplate({ graph, control }) {
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "370px 1fr",
    gridTemplateRows: "80px 1fr 100px",
    gridTemplateAreas: `
          "navbar navbar"
          "sidebar main"
          "footer footer"
        `,
    height: "100vh",
  };

  const navbarStyle = {
    gridArea: "navbar",
    height: "80px",
  };

  const sidebarStyle = {
    gridArea: "sidebar",
    width: "370px",
    height: "calc(100vh - 161px)",
  };

  const mainStyle = {
    gridArea: "main",
    backgroundColor: "#fff",
    height: "auto",
    overflow: "auto",
  };

  const footerStyle = {
    gridArea: "footer",
    height: "80px",
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
