import React from "react";
import Filter from "./Filter";
import Data from "./Data";
import Map from "../Map/Map";
import { listData } from "../../../lib/dummyData";

const ListPage = () => {
  const data = listData;
  return (
    <div className="flex flex-col-reverse lg:flex-row gap-2 px-3 lg:px-14 w-full lg:h-[calc(100vh-140px)]">
      <div className=" lg:w-3/5 ">
        <Filter />
        <Data />
      </div>
      <div className="w-full lg:w-2/5 h-[25vh] lg:h-full">
        <Map data={data} />
      </div>
    </div>
  );
};

export default ListPage;
