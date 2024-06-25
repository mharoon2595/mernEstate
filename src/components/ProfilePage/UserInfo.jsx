import React, { useContext } from "react";
import { UserContext } from "../../utils/Context";
import noavatar from "../../assets/noavatar.jpg";

const UserInfo = ({ update }) => {
  const { username, email, setUpdateFlag, updateFlag, existingAvatar } =
    useContext(UserContext);
  return (
    <>
      <div className="flex justify-between p-5">
        <p className="text-lg">User Information</p>
        <button
          className="bg-yellow-500 p-3"
          onClick={() => {
            setUpdateFlag(true);
          }}
        >
          Update profile
        </button>
      </div>
      <div className=" p-5">
        <div className="flex items-center gap-5 mb-3">
          <p>Avatar:</p>
          <img
            src={existingAvatar || noavatar}
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="flex gap-2 mb-3">
          <p>Username:</p>
          <p>{username}</p>
        </div>
        <div className="flex gap-2">
          <p>Email:</p>
          <p>{email}</p>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
