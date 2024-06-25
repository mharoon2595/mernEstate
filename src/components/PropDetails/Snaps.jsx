import React, { useState } from "react";
import { singlePostData } from "../../../lib/dummyData";
import Slider from "./Slider";

const Snaps = ({ images }) => {
  const [show, setShow] = useState(false);
  const [imgNum, setImgNum] = useState();

  let closeSlider = () => {
    setShow(false);
  };

  let nextSlide = () => {
    if (imgNum === 3) {
      setImgNum(0);
    } else {
      setImgNum((prevImgNum) => prevImgNum + 1);
    }
  };

  let prevSlide = () => {
    if (imgNum === 0) {
      setImgNum(3);
    } else {
      setImgNum((prevImgNum) => prevImgNum - 1);
    }
  };

  return (
    <>
      {show && (
        <Slider
          image={images[imgNum]}
          closeSlider={closeSlider}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
        />
      )}
      <div className="h-[350px] sm:h-[400px] md:h-[50%] p-5">
        <div className="flex h-full gap-5">
          <div
            className=" h-full w-[75%] rounded-xl cursor-pointer"
            onClick={() => {
              setShow(true);
              setImgNum(0);
            }}
          >
            <img
              src={images[0]}
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-3 h-full w-[25%]">
            <div
              className="h-1/3  rounded-xl"
              onClick={() => {
                setShow(true);
                setImgNum(1);
              }}
            >
              <img
                src={images[1]}
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
            <div
              className="h-1/3  rounded-xl"
              onClick={() => {
                setShow(true);
                setImgNum(2);
              }}
            >
              <img
                src={images[2]}
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
            <div
              className="h-1/3  rounded-xl"
              onClick={() => {
                setShow(true);
                setImgNum(3);
              }}
            >
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
