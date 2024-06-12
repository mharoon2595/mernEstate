import React from "react";
import { useEffect } from "react";

const Modal = ({ active, onClick }) => {
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup to reset the overflow style when the component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [active]);

  return (
    <div className="absolute bg-black top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-[1000] h-[250px] w-[50vw] flex justify-center items-center rounded-lg">
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
