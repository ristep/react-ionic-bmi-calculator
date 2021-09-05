import React, { createContext, useContext, useState } from "react";
import Axios from "Axios";

const initauthData = { OK: false, error: false, data:{ name:"Nikoj"} };

const getUserTokenQuery = (username, password) => ({
  getToken: {
    username: username,
    password: password,
  },
});

const useUserLoginData = () => {
  const [authData, setAuthData] = useState(initauthData);

  const clearKey   = () => {
    setAuthData(initauthData);
  };

  const getKey = (e, formData) => {
    e.preventDefault();
    (async () => {
      setAuthData({});
      await Axios.post(
        "",
        getUserTokenQuery(formData.username, formData.password)
      )
        .then((ret) => {
          setAuthData({
            ...ret.data,
            status: ret.status,
            statusText: ret.statusText,
            error: ret.data.count===0,
          });
        })
        .catch((err) => {
          setAuthData({
            data:{},
            status: 204,
            statusText: "Data base error!!",
            error: true,
            errorNo: err.error,
            errMessage: err.message,
            name: err.name,
            config: err.config,
          });
        });
    })();
    //    setUserdata(getUserTokenQuery(username, password));
  };


  return ( { authData, getKey, clearKey } );
}

const userDataContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useUserLoginData().
export function ProvideAuthData({ children }) {
    const  authObject  = useUserLoginData();
    return <userDataContext.Provider value={authObject}>{children}</userDataContext.Provider>;
  }  

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuthData = () => {
  return useContext(userDataContext);
}; 

