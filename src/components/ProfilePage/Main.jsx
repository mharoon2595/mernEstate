import React, { useContext, useState } from "react";
import UserInfo from "./UserInfo";
import MyList from "./MyList";
import UpdateProfile from "./UpdateProfile";
import noavatar from "../../assets/noavatar.jpg";
import { UserContext } from "../../utils/Context";
import UploadWidget from "../uploadWidget/UploadWidget";
import Messages from "./Messages";

const Main = () => {
  const { updateFlag, existingAvatar, setProfilePic, profilePic } =
    useContext(UserContext);

  return (
    <>
      <div className="hidden md:flex absolute w-2/5 h-full bg-[#FFDAB9] z-[-1] right-0 top-0"></div>
      <div className="flex flex-col h-full md:flex md:flex-row  md:min-h-[calc(100vh-120px)]">
        <div className="block md:flex md:flex-col md:gap-5 md:w-3/5 md:min-h-full">
          {updateFlag ? (
            <UpdateProfile />
          ) : (
            <>
              <UserInfo />
              <MyList />
            </>
          )}
        </div>
        <div className="block md:flex md:flex-col md:w-2/5 gap-3 md:min-h-full md:px-5">
          {updateFlag ? (
            <>
              <div className="flex flex-col gap-2 h-full justify-center items-center">
                <img
                  src={profilePic || existingAvatar || noavatar}
                  className="w-52 h-52"
                ></img>
                <UploadWidget
                  onUpload={setProfilePic}
                  details={{
                    cloudName: "dcyjq0oe4",
                    uploadPreset: "h8pq36ck",
                    maxFileSize: 5000000,
                    multiple: false,
                    folder: "estate",
                  }}
                />
              </div>
            </>
          ) : (
            <div className="hidden md:block">
              <p className="px-3">Messages</p>
              <Messages />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
