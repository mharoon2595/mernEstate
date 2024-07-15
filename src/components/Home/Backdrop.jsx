import React from "react";

const Backdrop = ({ onClick, show, fromMsgModal }) => {
  return (
    <div
      className={`${
        fromMsgModal ? "fixed" : "absolute"
      } inset-0 h-full w-full z-[100] bg-zinc-800 opacity-75 cursor-pointer`}
      onClick={() => {
        onClick && onClick();
        show && show();
      }}
    ></div>
  );
};

export default Backdrop;
