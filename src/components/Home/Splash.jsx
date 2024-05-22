import React from "react";
import hero from "../../assets/heroPic.png";
import Search from "./Search";

const Splash = () => {
  return (
    <>
      <div className="hidden md:flex absolute w-2/5 h-full bg-[#FFDAB9] z-[-1] right-0 top-0"></div>
      <div className=" relative h-full w-full  flex gap-10 items-center">
        <div className="w-full md:w-[55%] h-full flex flex-col gap-7 mx-5 px-10 my-20 py-20">
          <div className="text-7xl font-semibold">
            Find the land of your dreams!
          </div>
          <div className="text-xl font-light">
            Your dream place right here mate, wassup buddies, looking for land
            that perfectly suits your needs? look no further, cuz we've got you
            covered.
          </div>
          <Search />
          <div className="flex justify-between">
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
          className="hidden md:flex w-[45%] h-fit absolute right-0 top-0"
        />
      </div>
    </>
  );
};

export default Splash;
