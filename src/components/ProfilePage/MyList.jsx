import React from "react";
import Data from "../List/Data";

const MyList = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center p-3">
        <p className="text-lg">My List</p>
        <button className="bg-yellow-500 p-3">Add New Post</button>
      </div>
      <Data />
    </div>
  );
};

export default MyList;
