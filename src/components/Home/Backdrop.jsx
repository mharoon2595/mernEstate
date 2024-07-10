import React from "react";
import Portal from "../../utils/Portal";

const Backdrop = ({ onClick, show }) => {
  return (
    <Portal containerId="backdrop">
      <div
        className="absolute inset-0 h-full w-full z-[100] bg-zinc-800 opacity-75 cursor-pointer"
        onClick={() => {
          onClick && onClick();
          show && show();
        }}
      ></div>
    </Portal>
  );
};

export default Backdrop;
