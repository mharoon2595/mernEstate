import React from "react";
import Snaps from "./Snaps";
import PropDesc from "./PropDesc";
import Map from "../Map/Map";

const PropDetails = () => {
  return (
    <>
      <div className="hidden md:flex absolute w-2/5 h-full bg-[#FFDAB9] z-[-1] right-0 top-0"></div>
      <div className="flex h-[1000px]">
        <div className="hidden md:flex md:flex-col md:gap-5 md:w-3/5 md:bg-slate-400 md:h-full">
          <Snaps />
          <PropDesc />
        </div>
        <div className="hidden md:flex md:flex-col md:w-2/5 gap-3 md:h-full md:p-5">
          General
          <div className=" bg-white p-2 rounded-md flex flex-col gap-5">
            <div>
              <p className="font-bold">Utilities</p>
              <p>Tenant is responsible</p>
            </div>
            <div>
              <p className="font-bold">Utilities</p>
              <p>Tenant is responsible</p>
            </div>
            <div>
              <p>Utilities</p>
              <p>Tenant is responsible</p>
            </div>
          </div>
          Room sizes
          <div className="flex justify-between ">
            <div className="p-2 bg-white rounded-md">{`80 sq.m (861 sqft)`}</div>
            <div className="p-2 bg-white rounded-md">{`2 beds`}</div>
            <div className="p-2 bg-white rounded-md">{`1 bathroom`}</div>
          </div>
          Nearby places
          <div className="bg-white p-3 flex justify-between rounded-md">
            <div>
              <p>School</p>
              <p>250m away</p>
            </div>
            <div>
              <p>Bus stop</p>
              <p>100m away</p>
            </div>
            <div>
              <p>Restaurant</p>
              <p>200m away</p>
            </div>
          </div>
          Location
          <Map />
          <div className="flex justify-between">
            <button className="bg-white border-2 border-yellow-300  p-3 rounded-md">
              Send a message
            </button>
            <button className="bg-white border-2 border-yellow-300  p-3 rounded-md">
              Save this place
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropDetails;
