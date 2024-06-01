import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar";

const Layout = () => {
  return (
    <>
      <div className="relative min-h-[100vh] mx-auto max-w-[1366px] ">
        <div className="px-3 lg:px-12">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
