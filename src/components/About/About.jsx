import React from "react";
import Counter from "./Counter";
import Carousel from "./Testimonials";

const About = () => {
  return (
    <div className="min-h-[100vh] mx-auto w-[70%] py-5 lg:p-6 flex flex-col items-center gap-5 overflow-clip ">
      <div className="p-5 flex justify-evenly gap-5 text-lg  items-center">
        <div className="flex flex-col items-center gap-2 lg:text-4xl">
          <Counter num={4.7} decimal />
          <p className="text-sm lg:text-xl">Avg. rating</p>
        </div>
        <p className="text-7xl font-thin">|</p>
        <div className="flex flex-col items-center gap-2 lg:text-4xl">
          <Counter num={200} />
          <p className="text-sm lg:text-xl">Awards won</p>
        </div>
        <p className="text-7xl font-thin">|</p>
        <div className="flex flex-col items-center gap-2 lg:text-4xl">
          <Counter num={1200} include />
          <p className="text-sm lg:text-xl">Properties sold</p>
        </div>
      </div>
      <p className="text-sm my-2 lg:text-base">
        Welcome to mernEstate, where your dream home becomes a reality! Our
        dedicated team of real estate professionals is committed to providing
        exceptional service, whether you're buying, selling, or renting. With
        years of experience in the industry, we have the knowledge and expertise
        to guide you through every step of the process. At mernEstate, we pride
        ourselves on our personalized approach, ensuring that each client
        receives the attention and care they deserve. From charming starter
        homes to luxurious estates, we offer a wide range of properties to suit
        every lifestyle and budget. Let us help you find your perfect home
        today!
      </p>
      <div className=" bg-yellow-500 rounded-lg overflow-hidden w-full lg:w-[80%] p-3">
        <Carousel />
      </div>
    </div>
  );
};

export default About;
