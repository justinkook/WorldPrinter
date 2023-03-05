import React from "react";
import "./MaskGroup.css";

function MaskGroup(props) {
  const { laptopStand3DPrint1 } = props;

  return (
    <div className="mask-group-1">
      <img className="laptop-stand-3-d-print-1-2" src={laptopStand3DPrint1} alt="laptop stand 3D print 1" />
    </div>
  );
}

export default MaskGroup;
