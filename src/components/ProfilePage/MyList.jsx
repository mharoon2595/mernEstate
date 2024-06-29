import React, { useEffect, useState } from "react";
import Data from "../List/Data";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../../lib/apiRequest";
import swal from "sweetalert";

const MyList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [savedData, setSavedData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await apiRequest("/post/myposts");
        console.log(data);
        setData(data.data);
      } catch (err) {
        swal("Uh oh", "List could not be loaded", "error");
        return;
      } finally {
        setIsLoading(false);
      }
    };
    const fetchSavedPosts = async () => {
      setIsLoading(true);
      try {
        const data = await apiRequest("/user/savedposts");
        console.log(data);
        setSavedData(data.data);
      } catch (err) {
        swal("Uh oh", "Saved posts could not be loaded", "error");
        return;
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    fetchSavedPosts();
  }, []);
  return (
    <div className="p-3">
      <div className="flex justify-between items-center p-3">
        <p className="text-lg">My List</p>
        <button className="bg-yellow-500 p-3" onClick={() => navigate("/add")}>
          Add New Post
        </button>
      </div>
      <Data profile data={data} isLoading={isLoading} />
      <div className="p-3 text-lg">Saved Posts</div>
      <Data save data={savedData} isLoading={isLoading} />
    </div>
  );
};

export default MyList;
