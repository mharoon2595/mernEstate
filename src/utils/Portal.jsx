import React from "react";
import ReactDOM from "react-dom";

const Portal = ({ children, containerId }) => {
  const container = document.getElementById(containerId);
  return ReactDOM.createPortal(children, container);
};

export default Portal;
