import React from "react";
import { listData } from "../../../lib/dummyData";

const DataCard = ({ data }) => {
  const {
    title,
    images,
    bedroom,
    bathroom,
    price,
    address,
    latitude,
    longitude,
  } = data;
  return (
    <>
      <div className="flex flex-col xxs:flex-row gap-5 w-full mb-10">
        <img
          src={images[0]}
          className="w-full xxs:w-1/2 sm:w-1/3 lg:w-1/2 h-40 object-fill rounded-lg"
        ></img>
        <div className="flex xxs:w-1/2 sm:w-2/3 lg:w-1/2 flex-col justify-between gap-2 px-2">
          <p>{title}</p>
          <p>{address}</p>
          <p>{`$${price}`}</p>
          <div className="flex flex-col sm:flex-row  gap-2 justify-between  lg:gap-2">
            <div className="flex flex-col xs:flex-row gap-2 ">
              <p className="bg-slate-300 rounded-md p-1">
                {bedroom} {bedroom > 1 ? "bedrooms" : "bedroom"}
              </p>
              <p className="bg-slate-300 rounded-md p-1">
                {bathroom} {bathroom > 1 ? "bathrooms" : "bathroom"}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="h-5 w-5 bg-gray-400 rounded-md"></button>
              <button className="h-5 w-5 bg-gray-400 rounded-md"></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Data = ({ data }) => {
  console.log(data);
  return (
    <div className="my-2 overflow-y-auto h-[calc(100vh-360px)] px-5">
      {data.map((item) => (
        <DataCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Data;
