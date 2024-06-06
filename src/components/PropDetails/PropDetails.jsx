import React from "react";

const PropDetails = () => {
  return (
    <>
      <div className="hidden md:flex absolute w-2/5 h-full bg-[#FFDAB9] z-[-1] right-0 top-0"></div>
      <div className="flex h-[100vh]">
        <div className="hidden md:flex md:w-3/5 md:bg-slate-400 md:h-full"></div>
        <div className="hidden md:flex md:w-2/5 md:bg-purple-500 opacity-50  md:h-full">
          ALoo
        </div>
      </div>
    </>
  );
};

export default PropDetails;
