import React, { useContext, useState } from "react";
import { UserContext } from "../../utils/Context";
import noavatar from "../../assets/noavatar.jpg";
import chat from "../../assets/chat.png";
import MessageModal from "./MessageModal";
import Backdrop from "../Home/Backdrop";

const UserInfo = ({ update }) => {
  const { username, email, setUpdateFlag, updateFlag, existingAvatar } =
    useContext(UserContext);

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && <Backdrop />}
      {showModal && <MessageModal show={setShowModal} />}
      <div className="flex justify-between p-5">
        <p className="text-lg">User Information</p>
        <button
          className="bg-yellow-500 p-3 rounded-lg"
          onClick={() => {
            setUpdateFlag(true);
          }}
        >
          Update profile
        </button>
      </div>
      <div className=" p-5">
        <div className="flex justify-between md:justify-normal">
          <div className="flex items-center gap-3 mb-3">
            <p>Avatar:</p>
            <img
              src={existingAvatar || noavatar}
              className="h-12 w-12 rounded-full"
            />
          </div>
          <div className="flex md:hidden items-center gap-2">
            <p className="">Chats:</p>
            <div
              className="bg-yellow-500 rounded-full flex justify-center items-center h-14 w-14 p-3 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <img src={chat} className="h-10 w-10" />
            </div>
          </div>
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
