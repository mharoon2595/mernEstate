import React, { useContext, useEffect, useState } from "react";
import { listData } from "../../../lib/dummyData";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { UserContext } from "../../utils/Context";
import apiRequest from "../../../lib/apiRequest";
import save from "../../assets/save.png";

const DataCard = ({ data, profile, save }) => {
  const {
    id,
    title,
    images,
    bedroom,
    bathroom,
    price,
    address,
    latitude,
    longitude,
    savedPosts,
  } = data;
  const { userId } = useContext(UserContext);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfSaved = () => {
      if (!userId || profile || save) return;
      else {
        savedPosts.map((item) => {
          if (item.userId === userId && item.postId === id) {
            setSaved(true);
            return;
          }
        });
      }
    };

    checkIfSaved();
  }, []);

  const saveHandler = async () => {
    setIsLoading(true);
    if (!userId) {
      navigate("/signin");
    } else {
      const dispatch = await apiRequest.post("/user/save/" + id);
      console.log(dispatch);
      if (dispatch.data.message === "Post removed from saved list") {
        setSaved(false);
        setIsLoading(false);
      } else {
        setSaved(true);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col xxs:flex-row gap-5 w-full mb-10 relative">
        {isLoading && <LoadingSpinner asOverlay />}
        <Link
          to={"/details/" + id}
          className="w-full xxs:w-1/2 sm:w-1/3 lg:w-1/2 h-40 object-fill rounded-lg"
        >
          <img src={images[0]} className="rounded-lg"></img>
        </Link>
        <div className="flex xxs:w-1/2 sm:w-2/3 lg:w-1/2 flex-col justify-between gap-2 px-2">
          <Link to={"/details/" + id}>
            <p className="text-teal-400 font-bold">{title}</p>
          </Link>
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
              <button
                className={`${
                  saved ? "bg-yellow-500" : "bg-gray-400 "
                } h-6 w-6 rounded-md p-1`}
                onClick={saveHandler}
              >
                <img src={save} />{" "}
              </button>
              <button className="h-6 w-6 bg-gray-400 rounded-md"></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Data = ({ data, profile, save, isLoading }) => {
  console.log(data);
  return (
    <div className="my-2 overflow-y-auto h-[calc(100vh-360px)] px-5 relative">
      {isLoading && <LoadingSpinner asOverlay />}
      {data &&
        data.map((item) => (
          <DataCard key={item.id} data={item} profile={profile} save={save} />
        ))}
      {data && data.length === 0 && !save && (
        <p>{profile ? "No properties posted yet." : "No properties found."}</p>
      )}
      {data && data.length === 0 && save && <p>{"No properties saved yet."}</p>}
    </div>
  );
};

export default Data;
