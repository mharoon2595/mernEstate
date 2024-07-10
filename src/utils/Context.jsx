import { createContext, useState, useCallback } from "react";

export const UserContext = createContext({
  setUsername: () => {},
  setLoggedIn: () => {},
  setEmail: () => {},
  setUserId: () => {},
  setExistingAvatar: () => {},
  token: null,
  setToken: () => {},
  tokenExpirationTime: null,
  setTokenExpirationTime: () => {},
});

export const ContextProvider = ({ children }) => {
  const [signIn, setSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [existingAvatar, setExistingAvatar] = useState("");
  const [loadProfile, setLoadProfile] = useState("");
  const [updatePost, setUpdatePost] = useState("");
  const [token, setToken] = useState();
  const [modalHeight, setModalHeight] = useState(false);
  const [tokenExpirationTime, setTokenExpirationTime] = useState(null);
  const [addMargin, setAddMargin] = useState(false);
  const [msgID, setMsgID] = useState();
  const [popUp, setPopUp] = useState(false);

  const login = (uid, username, token, avatar, email, expirationTime) => {
    setUserId(uid);
    setUsername(username);
    setLoggedIn(true);
    setEmail(email);
    setExistingAvatar(avatar);
    const tokenExpirationDate =
      expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationTime(tokenExpirationDate);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: uid,
        token: token,
        username: username,
        expiry: tokenExpirationDate.toISOString(),
        avatar: avatar,
        email: email,
      })
    );
    setToken(token);
  };

  return (
    <UserContext.Provider
      value={{
        signIn,
        setSignIn,
        username,
        setUsername,
        loggedIn,
        setLoggedIn,
        email,
        setEmail,
        updateFlag,
        setUpdateFlag,
        userId,
        setUserId,
        profilePic,
        setProfilePic,
        existingAvatar,
        setExistingAvatar,
        loadProfile,
        setLoadProfile,
        updatePost,
        setUpdatePost,
        modalHeight,
        setModalHeight,
        token,
        setToken,
        login,
        tokenExpirationTime,
        setTokenExpirationTime,
        msgID,
        setMsgID,
        addMargin,
        setAddMargin,
        popUp,
        setPopUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
