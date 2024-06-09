import React, { useState } from "react";
import { singlePostData } from "../../../lib/dummyData";
import Slider from "./Slider";

const Snaps = () => {
  const { images } = singlePostData;
  const [show, setShow] = useState(false);
  return (
    <>
      {show && <Slider />}
      <div className="h-[50%] p-5">
        <div className="flex h-full gap-5">
          <div
            className=" h-full w-[75%] rounded-xl cursor-pointer"
            onClick={() => setShow(true)}
          >
            <img
              src={images[0]}
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-3 h-full w-[25%]">
            <div className="h-1/3  rounded-xl">
              <img
                src={images[1]}
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
            <div className="h-1/3  rounded-xl">
              <img
                src={images[2]}
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
            <div className="h-1/3  rounded-xl">
              <img
                src={images[3]}
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Snaps;
