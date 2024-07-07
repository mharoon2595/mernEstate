import React, { useContext } from "react";
import DOMPurify from "dompurify";
import pin from "../../assets/pin.png";
import { UserContext } from "../../utils/Context";

const PropDesc = ({ title, address, price, user, postDetail }) => {
  return (
    <div className=" md:h-[40%] mx-3 p-2">
      <div className="info">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="flex gap-1">
              <img src={pin} alt="" className="w-5 h-5" />
              <span>{address}</span>
            </div>
            <div className="bg-orange-200 rounded-md w-fit p-1">$ {price}</div>
          </div>
          <div className="bg-orange-200 w-28  rounded-lg p-3 flex flex-col items-center">
            <img src={user.avatar} alt="" className="w-20 h-20 rounded-full" />
            <span className="font-bold">{user.username}</span>
          </div>
        </div>
        <div
          className="py-5 "
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(postDetail.desc),
          }}
        ></div>
      </div>
    </div>
  );
};

export default PropDesc;
