import React from "react";
import BodyWhatever from "../BodyWhatever";
import HeadFlatTop from "../HeadFlatTop";
import FaceSmile from "../FaceSmile";
import "./APersonbust3.css";

function APersonbust3(props) {
  const { faceSmileProps } = props;

  return (
    <div className="peep-68">
      <div className="overlap-group3-1">
        <BodyWhatever />
        <HeadFlatTop />
        <FaceSmile className={faceSmileProps.className} />
      </div>
    </div>
  );
}

export default APersonbust3;
