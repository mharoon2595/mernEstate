import React from "react";

const Backdrop = ({ onClick }) => {
  return (
    <div
      className="absolute inset-0 h-full w-full z-[100] bg-zinc-800 opacity-75"
      onClick={onClick}
    ></div>
  );
};

export default Backdrop;
