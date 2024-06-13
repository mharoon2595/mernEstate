import React from "react";
import UserInfo from "./UserInfo";
import MyList from "./MyList";

const Main = () => {
  return (
    <>
      <div className="hidden md:flex absolute w-2/5 h-full bg-[#FFDAB9] z-[-1] right-0 top-0"></div>
      <div className="flex flex-col h-full md:flex md:flex-row  md:min-h-[calc(100vh-120px)]">
        <div className="block md:flex md:flex-col md:gap-5 md:w-3/5 md:min-h-full">
          <UserInfo />
          <MyList />
        </div>
        <div className="block p-2 md:flex md:flex-col md:w-2/5 gap-3 md:min-h-full md:p-5">
          Messages
        </div>
      </div>
    </>
  );
};

export default Main;
