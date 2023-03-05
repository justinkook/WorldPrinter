import React from "react";
import "./FaceSmile.css";

function FaceSmile(props) {
  const { className } = props;

  return (
    <div className={`face ${className || ""}`}>
      <img className="ink-5" src="/img/---ink-5.svg" alt="Ink" />
    </div>
  );
}

export default FaceSmile;
