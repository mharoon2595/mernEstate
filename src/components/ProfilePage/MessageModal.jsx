import React from "react";
import Messages from "./Messages";
import { useState } from "react";

const MessageModal = ({ show, full }) => {
  return (
    <div
      className={`absolute flex inset-0 min-h-full w-full justify-center items-center z-[100000] ${
        full ? "" : "md:hidden"
      }`}
    >
      <div className={`bg-slate-400 w-[80%] h-[80%]  rounded-md  p-2`}>
        <p
          className="text-right px-3 font-bold cursor-pointer"
          onClick={() => show(false)}
        >
          X
        </p>
        <p className="text-center text-white text-lg font-bold">Chats</p>
        <Messages fromModal full={full} />
      </div>
    </div>
  );
};

export default MessageModal;
