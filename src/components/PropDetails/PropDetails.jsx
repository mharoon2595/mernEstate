import React from "react";
import Snaps from "./Snaps";
import PropDesc from "./PropDesc";
import Map from "../Map/Map";
import { useLoaderData } from "react-router-dom";
import bed from "../../assets/bed.png";
import size from "../../assets/size.png";
import bath from "../../assets/bath.png";

const PropDetails = () => {
  const post = useLoaderData();
  console.log(post);
  const { title, address, price, user, postDetail } = post;
  return (
    <>
      <div className="hidden md:flex absolute w-2/5 h-full bg-[#FFDAB9] z-[-1] right-0 top-0"></div>
      <div className="flex flex-col h-full md:flex md:flex-row  md:min-h-[calc(100vh-120px)]">
        <div className="block md:flex md:flex-col md:gap-5 md:w-3/5 md:min-h-full">
          <Snaps images={post.images} />
          <PropDesc props={{ title, address, price, user, postDetail }} />
        </div>
        <div className="block p-2 md:flex md:flex-col md:w-2/5 gap-3 md:min-h-full md:p-5">
          General
          <div className=" bg-white p-2 rounded-md flex flex-col gap-5">
            <div>
              <p className="font-bold">Utilities</p>
              <p>
                {post.postDetail.utilities === "owner"
                  ? "Owner is repsonsible"
                  : "Tenant is responsible"}
              </p>
            </div>
            <div>
              <p className="font-bold">Pet policy</p>
              <p>
                {post.postDetail.pet === "allowed"
                  ? "Pets are allowed"
                  : "Pets are not allowed"}
              </p>
            </div>
            <div>
              <p className="font-bold">Income policy</p>
              <p>{post.postDetail.income}</p>
            </div>
          </div>
          Room sizes
          <div className="flex justify-between ">
            <div className="flex gap-2 p-2 bg-white rounded-md items-center">
              <img src={size} className="w-5 h-5"></img>
              <div>{`${post.postDetail.size} sq.m`}</div>
            </div>
            <div className="flex gap-2 p-2 bg-white rounded-md items-center">
              <img src={bed} className="w-5 h-5"></img>
              <div>
                {post.bedroom === 1 ? `1 bedroom` : post.bedroom + " bedrooms"}
              </div>
            </div>
            <div className="flex gap-2 p-2 bg-white rounded-md items-center">
              <img src={bath} className="w-5 h-5"></img>
              <div>
                {post.bathroom === 1
                  ? `1 bathroom`
                  : post.bathroom + " bathrooms"}
              </div>
            </div>
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
          <div className="h-full">
            <Map data={[post]} />
          </div>
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
