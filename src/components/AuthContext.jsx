
import React, { createContext, useState, useEffect } from 'react';
import AuthStore from '../api/authStore';


export const authContext = createContext({
  user: null,
  
});



function AuthContext(props) {
 
    const [user,setUser] = useState()

    const setUserFromToken =  async () => {
      const user = await AuthStore.decodeToken()
      if(user) setUser(user)
    }

  useEffect(() => {
    window.onload = () => {
      // console.log();
      //Read localStorage
      setUserFromToken()

    };
   
    return () => {};
  }, []);


  
  return (
    <authContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}

export default AuthContext;