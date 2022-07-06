import React from "react";
import "./cup.css";
import bubbles from "./images/BUBBLES.gif";

const Cup = () => {
  const imageStyles = {
    height: "150px",
    position: "absolute",
    bottom: "-150px",
    left: "0px",
    transform: `translate(-20px, ${-50}px)`,
  };

  const cupStyles = {
    borderTop: "100px solid rgba(84, 148, 147, 0.228)",
    borderLeft: "25px solid transparent",
    borderRight: "25px solid transparent",
    height: "0",
    width: "50px",
    position: "relative",
    ":before": { content: bubbles, ...imageStyles },
  };

  return (
    <div id="cup">
      Cup
      {/* <img style={imageStyles} id="bubbles" src={bubbles} alt="bubbles" /> */}
    </div>
  );
};

export default Cup;
