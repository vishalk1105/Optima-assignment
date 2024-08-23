import React from "react";

const ReactButton = ({
  btnType,
  btnText,
  onClickfn,
  btnClass,
  reactBtnOuterDiv,
  dataBsDismiss,
  dataBsToggle,
  dataBsTarget,
}) => {
  return (
    <div className={`reactButton text-center ${reactBtnOuterDiv}`}>
      <button
        type={btnType}
        className={`btn ${btnClass}`}
        onClick={onClickfn}
        data-bs-toggle={dataBsToggle}
        data-bs-dismiss={dataBsDismiss}
        data-bs-target={dataBsTarget}
      >
        {btnText}
      </button>
    </div>
  );
};

export default ReactButton;
