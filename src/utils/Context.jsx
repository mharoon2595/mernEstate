import { createContext, useState } from "react";

export const UserContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [signIn, setSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [existingAvatar, setExistingAvatar] = useState("");
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
