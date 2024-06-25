import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../utils/Context.jsx";
import apiRequest from "../../../lib/apiRequest.js";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [error, setError] = useState("");
  const {
    username,
    email,
    userId,
    setUsername,
    setEmail,
    setUpdateFlag,
    existingAvatar,
    profilePic,
    setProfilePic,
    setExistingAvatar,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUsername = formData.get("username");
    const newEmail = formData.get("email");
    const newPassword = formData.get("password");
    const endpoint = "/user/" + userId;

    if (
      newUsername === username &&
      newEmail === email &&
      !newPassword &&
      profilePic === existingAvatar
    ) {
      setError("No change detected in credentials!");
      return;
    }

    try {
      const data = await apiRequest.put(endpoint, {
        username: newUsername,
        email: newEmail,
        password: newPassword,
        avatar: profilePic,
      });
      await swal("Great!", "Details updated!", "success");
      setUsername(newUsername);
      setEmail(newEmail);
      setUpdateFlag(false);
      profilePic && setExistingAvatar(profilePic);
      setProfilePic("");
    } catch (err) {
      await swal("Oops!", err.response.data.message || err.message, "error");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h1 className="font-bold">Update Profile</h1>
          {error && <p className="text-red-500 font-bold">{error}</p>}
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={username}
              className="border border-black p-2 rounded-md"
              onChange={() => setError(false)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={email}
              onChange={() => setError(false)}
              className="border border-black p-2 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={() => setError(false)}
              className="border border-black p-2 rounded-md"
            />
          </div>
          <button className="bg-yellow-500 rounded-lg p-2" type="submit">
            Update
          </button>
        </form>
        <button
          className="bg-yellow-500 rounded-lg p-2 my-3"
          onClick={() => {
            setUpdateFlag(false);
            setProfilePic("");
          }}
        >
          Go back
        </button>
      </div>
    </>
  );
};

export default UpdateProfile;
