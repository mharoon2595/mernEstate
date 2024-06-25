import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar";
import { UserContext } from "../../utils/Context";

const Layout = () => {
  return (
    <>
      <div className="relative min-h-[100vh] mx-auto max-w-[1366px] ">
        <div className="px-3 lg:px-5">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </>
  );
};

const RequireAuth = () => {
  const { loggedIn } = useContext(UserContext);
  return (
    <>
      {!loggedIn ? (
        <Navigate to="/" />
      ) : (
        <div className="relative min-h-[100vh] mx-auto max-w-[1366px] ">
          <div className="px-3 lg:px-5">
            <Navbar />
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
};

export { RequireAuth, Layout };
