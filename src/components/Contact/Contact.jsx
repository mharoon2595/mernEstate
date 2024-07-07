import React, { useState } from "react";
import Map from "../Map/Map";
import { locations } from "../../../lib/dummyData";

const Contact = () => {
  const [location, setLocation] = useState();
  const [mapLocation, setMapLocation] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const location = formData.get("location");

    if (location) {
      setMapLocation(location);
      let temp = location.split("");
      temp[0] = temp[0].toUpperCase();
      temp = temp.join("");
      setLocation(temp);
    }
  };

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-3 h-[calc(100vh-96px)] md:h-[600px] lg:h-[calc(100vh-96px)] ">
        <div className="hidden lg:flex absolute w-2/5 h-full bg-[#FFDAB9] z-[-1] right-0 top-0"></div>

        <div className="block h-[70%] md:min-h-[60%]  lg:flex lg:flex-col lg:gap-5 lg:w-3/5 lg:min-h-full  p-5 mb-3">
          <form className="flex flex-col w-fit gap-2 " onSubmit={submitHandler}>
            <label htmlFor="location" className="font-semibold">
              Choose a location
            </label>
            <select
              id="location"
              name="location"
              className="border border-black"
            >
              <option value="" defaultChecked>
                Select an option
              </option>
              <option value="kochi">Kochi</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="gurgaon">Gurgaon</option>
              <option value="mumbai">Mumbai</option>
            </select>
            <button
              className="bg-yellow-400 w-fit p-2 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </form>
          {location && (
            <div className="my-3   flex flex-col gap-3">
              <p className="text-xl font-bold">{location + " office"}</p>
              <p className="font-semibold">Address:</p>
              <p className="font-semibold">
                {locations[location.toLowerCase()][1]}
              </p>
              <p className="font-semibold">
                Contact number: +91 {locations[location.toLowerCase()][2]}
              </p>
            </div>
          )}
        </div>

        <div className=" p-2 lg:flex lg:flex-col lg:w-2/5  h-[30%] md:h-[40%] lg:h-full lg:p-5 ">
          <div className="h-full">
            {mapLocation && <Map data={[locations[mapLocation][0]]} contact />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
