import React, { useContext, useState } from "react";
import { UserContext } from "../../utils/Context";
import noavatar from "../../assets/noavatar.jpg";
import chat from "../../assets/chat.png";
import MessageModal from "./MessageModal";
import Backdrop from "../Home/Backdrop";
import { useNotificationsStore } from "../../../lib/notificationsStore";

const UserInfo = ({ update }) => {
  const { username, email, setUpdateFlag, updateFlag, existingAvatar } =
    useContext(UserContext);

  const number = useNotificationsStore((state) => state.number);

  const [showModal, setShowModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      {showModal && (
        <Backdrop onClick={() => setShowModal(false)} fromMsgModal />
      )}
      {showModal && (
        <MessageModal
          show={setShowModal}
          active={modalActive}
          onClick={() => setModalActive(false)}
        />
      )}
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
              className="relative bg-yellow-500 rounded-full flex justify-center items-center h-14 w-14 p-3 cursor-pointer"
              onClick={() => {
                setShowModal(true);
                setModalActive(true);
              }}
            >
              <div
                className={`${
                  number === 0
                    ? "hidden"
                    : "absolute -top-2 -right-1 bg-red-500 w-5 h-5 text-xs text-white font-semibold flex justify-center items-center rounded-full"
                }`}
              >
                {number}
              </div>
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
