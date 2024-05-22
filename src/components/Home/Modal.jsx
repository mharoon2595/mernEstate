import React from "react";

const Modal = ({ onClick }) => {
  return (
    <div className="absolute bg-black top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 h-[50vh] w-[50vw] flex justify-center items-center rounded-lg">
      <div
        className="absolute top-0 right-0 p-3 text-white font-bold cursor-pointer"
        onClick={onClick}
      >
        X
      </div>
      <div className="flex flex-col p-3 gap-5 text-yellow-400">
        <div>Home</div>
        <div>About</div>
        <div>Contact</div>
        <div>Agents</div>
      </div>
    </div>
  );
};

export default Modal;
