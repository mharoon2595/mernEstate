import React, { useContext, useEffect, useCallback } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar";
import { UserContext } from "../../utils/Context";
import apiRequest from "../../../lib/apiRequest";
import CustomHook from "../../utils/CustomHook";
import { SocketContext } from "../../utils/SocketContext";

const Layout = () => {
  let logoutTimer;

  const { socket } = useContext(SocketContext);

  CustomHook();
  const {
    setUsername,
    setLoggedIn,
    setEmail,
    setUserId,
    setExistingAvatar,
    token,
    setToken,
    tokenExpirationTime,
    setTokenExpirationTime,
    login,
    modalHeight,
  } = useContext(UserContext);

  const logout = useCallback(async () => {
    setToken(null);
    setUserId(null);
    setTokenExpirationTime(null);
    setUsername(null);
    setLoggedIn(false);
    setEmail(null);
    setExistingAvatar(null);
    localStorage.removeItem("user");
    await apiRequest("/auth/logout");
    socket.disconnect();
  }, []);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("user"));
    if (
      localData &&
      localData.token &&
      new Date(localData.expiry) > new Date()
    ) {
      login(
        localData.id,
        localData.username,
        localData.token,
        localData.avatar,
        localData.email,
        new Date(localData.expiry)
      );
    }
  }, []);

  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime =
        new Date(tokenExpirationTime).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationTime, logout]);

  return (
    <>
      <div
        className={`relative ${
          modalHeight ? "h-[100vh]" : "min-h-[100vh] mb-0"
        }  mx-auto max-w-[1366px]`}
      >
        <div className="px-3 lg:px-5">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </>
  );
};

const RequireAuth = () => {
  const { loggedIn, modalHeight } = useContext(UserContext);
  CustomHook();

  return (
    <>
      {!loggedIn ? (
        <Navigate to="/" />
      ) : (
        <div
          className={`relative ${
            modalHeight ? "h-[100vh]" : "min-h-[100vh] mb-0"
          }  mx-auto max-w-[1366px]`}
        >
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
