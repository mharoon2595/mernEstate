import React from "react";

const Slider = () => {
  return (
    <div className="fixed flex inset-0 bg-black opacity-50  z-[100] p-5">
      <div className="flex-1 h-full bg-white"></div>
      <div className="flex-[10] h-full bg-indigo-400"></div>
      <div className="flex-1 h-full bg-white"></div>
    </div>
  );
};

export default Slider;
