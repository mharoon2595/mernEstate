import React from "react";
import Filter from "./Filter";
import Data from "./Data";

const ListPage = () => {
  return (
    <div className="flex px-3 lg:px-14 w-full">
      <div className=" w-3/5 h-full">
        <Filter />
        <Data />
      </div>
      <div className=" w-2/5 h-full">List</div>
    </div>
  );
};

export default ListPage;
