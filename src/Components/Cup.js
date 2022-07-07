import React from "react";
import { getTimeDifference } from "../utils/utils";
import "./cup.css";
import bubbles from "./images/BUBBLES.gif";

const Cup = ({ progress = 20 }) => {
  const fillProgress = 200 - progress * 2;

  const cupStyles = {
    width: "100px",
    height: "200px",
    borderRadius: "0 0 10px 10px",
    boxShadow: "0 8px 8px rgba(86,125,128, .75)",
    borderTop: "2px solid transparent",
    background: `url(${bubbles})`,
    backgroundSize: "cover",
    backgroundPosition: `0px ${fillProgress}px`,
    backgroundRepeat: "repeat-x",
    position: "relative",
  };

  return <div style={cupStyles} />;
};

export default Cup;
