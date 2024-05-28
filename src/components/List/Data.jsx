import React from "react";
import { listData } from "../../../lib/dummyData";

const DataCard = ({ data }) => {
  const { title, img, bedroom, bathroom, price, address, latitude, longitude } =
    data;
  return (
    <>
      <div className="flex gap-5 w-full mb-10">
        <img src={img} className="w-1/2 h-40 object-fill rounded-lg"></img>
        <div className="flex w-1/2 flex-col justify-between px-2">
          <p>{title}</p>
          <p>{address}</p>
          <p>{`$${price}`}</p>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <p className="bg-slate-300 rounded-md p-1">{bedroom} bedrooms</p>
              <p className="bg-slate-300 rounded-md p-1">{bathroom} bathroom</p>
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

const Data = () => {
  return (
    <div className="my-2 overflow-y-auto h-[calc(100vh-120px)]">
      {listData.map((item) => (
        <DataCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Data;
