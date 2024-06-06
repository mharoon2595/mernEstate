import React from "react";

const Snaps = () => {
  return (
    <div className="h-[50%] bg-yellow-400 p-5">
      <div className="flex h-full gap-5">
        <div className="bg-teal-300 h-full w-[75%] rounded-md"></div>
        <div className="flex flex-col gap-3 h-full w-[25%]">
          <div className="h-1/3 bg-teal-300 rounded-md"></div>
          <div className="h-1/3 bg-teal-300 rounded-md"></div>
          <div className="h-1/3 bg-teal-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Snaps;
