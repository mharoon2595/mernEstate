import React from "react";

const UserInfo = () => {
  return (
    <>
      <div className="flex justify-between p-5">
        <p className="text-lg">User Information</p>
        <button className="bg-yellow-500 p-3">Update profile</button>
      </div>
      <div className=" p-5">
        <div className="flex items-center gap-5 mb-3">
          <p>Avatar:</p>
          <img
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="flex gap-2 mb-3">
          <p>Username:</p>
          <p>John Doe</p>
        </div>
        <div className="flex gap-2">
          <p>Email:</p>
          <p>john@gmail.com</p>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
