import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  user: {},
  accessToken: undefined,
};

const UserContext = createContext(initialState);

export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
  const [user, setUser] = useState({});

  function handleAccessTokenChange() {
    const savedAccessToken = localStorage.getItem("access_token");
    if (!savedAccessToken || savedAccessToken === "null") {
      localStorage.setItem("access_token", accessToken);
    }

    if (!user.name && accessToken) {
      axios({
        method: "post",
        url: "http://localhost:8080/getuser",
        withCredentials: true,
      }).then((res) => {
        console.log(res.data.user);
        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setUser({});
        }
      });
    } else if (!accessToken) {
      // Log Out
      localStorage.removeItem("access_token");
      setUser({});
    }
  }

  useEffect(() => {
    handleAccessTokenChange();
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ user, accessToken, setAccessToken, setUser }}>
      <>{children}</>
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
