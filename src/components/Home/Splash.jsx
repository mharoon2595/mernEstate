import React from "react";
import hero from "../../assets/heroPic.png";
import Search from "./Search";

const Splash = () => {
  return (
    <>
      <div className="hidden md:flex absolute w-2/5 h-full bg-[#FFDAB9] z-[-1] right-0 top-0"></div>
      <div className=" relative h-full w-full  flex  items-center">
        <div className="w-full md:w-[55%] h-full flex flex-col gap-5 mx-5 px-10 my-5 py-10">
          <div className="text-2xl md:text-4xl lg:text-7xl font-bold lg:font-semibold">
            Find the land of your dreams!
          </div>
          <div className="text-xl md:text-xl lg:text-2xl font-light">
            Welcome to MERNestate, where your dream home becomes a reality with
            just a click. Our cutting-edge technology and expert agents
            seamlessly connect you to the perfect property, whether you're
            buying, selling, or investing.
          </div>
          <Search />

          <div className="flex justify-between gap-2">
            <div>
              <div className="text-2xl font-bold">16+</div>
              <div>Years of experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold">200</div>
              <div>Awards won</div>
            </div>
            <div>
              <div className="text-2xl font-bold">1200+</div>
              <div>Properties ready</div>
            </div>
          </div>
        </div>
        <img
          src={hero}
          className="hidden md:flex w-[45%] max-h-full  absolute right-0 top-0"
        />
      </div>
    </>
  );
};

export default Splash;
