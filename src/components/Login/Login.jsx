import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utils/Context";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner.jsx";
import apiRequest from "../../../lib/apiRequest.js";

const UserLogin = () => {
  const signInContext = useContext(UserContext);
  const [errMsg, setErrMsg] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRegDisabled, setIsRegDisabled] = useState(true);
  const [inputVal, setInputVal] = useState({
    email: "",
    username: "",
    password: "",
  });
  const {
    signIn,
    setUsername,
    setSignIn,
    setLoggedIn,
    setEmail,
    setUserId,
    setExistingAvatar,
  } = signInContext;
  const { email, username, password } = inputVal;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log("credentials--->", email, username, password);

  useEffect(() => {
    setErrMsg(false);
    setInputVal({
      ...inputVal,
      ["username"]: "",
      ["password"]: "",
      ["email"]: "",
    });
  }, [signIn]);

  useEffect(() => {
    if (username !== "" && password !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    if (username !== "" && password !== "" && email !== "") {
      setIsRegDisabled(false);
    } else {
      setIsRegDisabled(true);
    }
  }, [username, password, email]);

  const loginHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    setIsLoading(true);

    console.log(username, password);
    try {
      const data = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      const response = await data;
      console.log(response);
      await swal("Alright!", "Logged In!", "success");
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
      setUsername(username);
      setEmail(response.data.email);
      setUserId(response.data.id);
      setLoggedIn(true);
      setExistingAvatar(response.data.avatar);
    } catch (err) {
      console.log(err.response.data.message);
      const errorMsg = err.response.data.message;
      setErrMsg(errorMsg);
      await swal("An error occured", errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");

    setIsLoading(true);

    console.log(username, password, email);
    try {
      const data = await apiRequest.post("/auth/register", {
        username,
        password,
        email,
      });
      const response = await data;
      console.log(response);
      await swal(
        "Alright!",
        "Registered successfully! Please login now",
        "success"
      );
      setSignIn(true);
      setInputVal({
        ...inputVal,
        ["username"]: "",
        ["password"]: "",
        ["email"]: "",
      });
    } catch (err) {
      console.log(err.response.data.message);
      const errorMsg = err.response.data.message;
      setErrMsg(errorMsg);
      await swal("An error occured", errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {console.log(isDisabled, isRegDisabled)}
      <div className="flex h-[calc(100vh-120px)] justify-center items-center">
        <div className="relative border-[3px] border-black flex flex-col items-center gap-3 p-5 rounded-md lg:text-2xl">
          {isLoading && <LoadingSpinner asOverlay />}
          {signIn ? (
            <>
              <div className="text-center text-3xl mb-5">Sign in</div>
              {errMsg && <p className="text-red-500 text-center">{errMsg}</p>}
              <form
                className="flex flex-col items-center"
                onSubmit={loginHandler}
              >
                <label className="text-xl">Username</label>
                <input
                  className={`p-2 border-[2px] border-black mb-3 rounded-md text-xl ${
                    errMsg && "bg-red-200"
                  }`}
                  placeholder="Username"
                  type="text"
                  required
                  name="username"
                  value={inputVal["username"]}
                  onChange={(e) => {
                    setErrMsg("");
                    setInputVal({ ...inputVal, ["username"]: e.target.value });
                  }}
                />
                <label className="text-xl">Password</label>
                <input
                  className={`p-2 border-[2px] border-black mb-3 rounded-md text-xl ${
                    errMsg && "bg-red-200"
                  }`}
                  placeholder="Password"
                  type="password"
                  required
                  name="password"
                  value={inputVal["password"]}
                  onChange={(e) => {
                    setErrMsg("");
                    setInputVal({ ...inputVal, ["password"]: e.target.value });
                  }}
                  minLength={8}
                />
                <button
                  className={`text-center text-xl bg-yellow-500 p-3 rounded-md ${
                    isDisabled ? "opacity-50" : "opacity-100"
                  }`}
                  type="submit"
                  disabled={isDisabled}
                >
                  Sign in
                </button>
              </form>
              <button
                className="text-center text-xl bg-yellow-500 p-3 rounded-md "
                onClick={() => {
                  signInContext.setSignIn(false);
                  setInputVal({
                    ...inputVal,
                    ["username"]: "",
                    ["password"]: "",
                    ["email"]: "",
                  });
                }}
              >
                New user? Sign up!
              </button>
            </>
          ) : (
            <>
              <div className="text-center text-3xl mb-5">Register</div>
              {errMsg && <p className="text-red-500 text-center">{errMsg}</p>}
              <form
                className="flex flex-col items-center"
                onSubmit={registerHandler}
              >
                <label className="text-xl">Email ID</label>
                <input
                  className={`p-2 border-[2px] border-black mb-3 rounded-md text-xl ${
                    errMsg && "bg-red-200"
                  }`}
                  placeholder="Email"
                  type="email"
                  required
                  name="email"
                  value={inputVal["email"]}
                  onChange={(e) => {
                    setErrMsg("");
                    setInputVal({ ...inputVal, ["email"]: e.target.value });
                  }}
                />
                <label className="text-xl">Username</label>
                <input
                  className={`p-2 border-[2px] border-black mb-3 rounded-md text-xl ${
                    errMsg && "bg-red-200"
                  }`}
                  placeholder="Username"
                  type="text"
                  required
                  name="username"
                  value={inputVal["username"]}
                  onChange={(e) => {
                    setErrMsg("");
                    setInputVal({ ...inputVal, ["username"]: e.target.value });
                  }}
                />
                <label className="text-xl">Password</label>
                <input
                  className={`p-2 border-[2px] border-black mb-3 rounded-md text-xl ${
                    errMsg && "bg-red-200"
                  }`}
                  placeholder="Password"
                  type="password"
                  required
                  name="password"
                  value={inputVal["password"]}
                  onChange={(e) => {
                    setErrMsg("");
                    setInputVal({ ...inputVal, ["password"]: e.target.value });
                  }}
                  minLength={8}
                />
                <button
                  className={`text-center text-xl bg-yellow-500 p-3 rounded-md ${
                    isRegDisabled ? "opacity-50" : "opacity-100"
                  }`}
                  type="submit"
                  disabled={isRegDisabled}
                >
                  Register
                </button>
              </form>
              <button
                className={`text-center text-xl bg-yellow-500 p-3 rounded-md `}
                onClick={() => {
                  signInContext.setSignIn(true);
                  setInputVal({
                    ...inputVal,
                    ["username"]: "",
                    ["password"]: "",
                    ["email"]: "",
                  });
                }}
              >
                Already have an account? Sign in!
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserLogin;
