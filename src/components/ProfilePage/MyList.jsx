import React from "react";
import Data from "../List/Data";
import { useNavigate } from "react-router-dom";

const MyList = () => {
  const navigate = useNavigate();
  return (
    <div className="p-3">
      <div className="flex justify-between items-center p-3">
        <p className="text-lg">My List</p>
        <button className="bg-yellow-500 p-3" onClick={() => navigate("/add")}>
          Add New Post
        </button>
      </div>
      <Data />
    </div>
  );
};

export default MyList;
