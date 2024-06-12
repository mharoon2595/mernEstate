import React from "react";
import arrow from "../../assets/arrow.png";

const Slider = ({ image, closeSlider, prevSlide, nextSlide }) => {
  return (
    <>
      <div className="fixed inset-0  bg-black z-[100] p-5">
        <div
          className="h-[5%] text-white flex flex-row-reverse font-bold py-1 px-2 text-3xl "
          onClick={closeSlider}
        >
          <div className=" cursor-pointer">X</div>
        </div>
        <div className="flex h-[95%]">
          <div className="flex flex-1 h-full justify-center items-center ">
            <img
              src={arrow}
              className="w-5 h-10  md:w-10 md:h-20"
              onClick={prevSlide}
            />
          </div>
          <div className="flex-[10] h-full ">
            <img
              src={image}
              className="h-full w-full object-contain md:object-cover"
            />
          </div>
          <div className="flex flex-1 h-full justify-center items-center ">
            <img
              src={arrow}
              className="w-5 h-10  md:w-10 md:h-20 rotate-180"
              onClick={nextSlide}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
