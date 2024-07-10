import React from "react";
import Messages from "./Messages";
import { useState } from "react";
import Portal from "../../utils/Portal";

const MessageModal = ({ show, full }) => {
  const [inputFocus, setInputFocus] = useState(false);
  return (
    <Portal containerId="modal">
      <div
        className={`absolute flex inset-0 h-full w-full justify-center items-center z-[100000] ${
          full ? "" : "md:hidden"
        }`}
      >
        <div
          className={`bg-slate-400 w-[80%] h-[80%] ${
            inputFocus ? "mb-[50vh]" : "pb-0"
          } rounded-md  p-2`}
        >
          <p
            className="text-right px-3 font-bold cursor-pointer"
            onClick={() => show(false)}
          >
            X
          </p>
          <p className="text-center text-white text-lg font-bold">Chats</p>
          <Messages
            fromModal
            full={full}
            inputFocus={inputFocus}
            setInputFocus={setInputFocus}
          />
        </div>
      </div>
    </Portal>
  );
};

export default MessageModal;
