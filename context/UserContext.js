import React, { createContext, useContext, useState } from 'react';

const INITIAL_STATE = {
  isLoggedIn: false,
  user: {},
};

const UserContext = createContext(INITIAL_STATE);

export function UserProvider({ children }) {
  const [userState, setUserState] = useState(INITIAL_STATE);

  const login = (userData) => {
    setUserState({ isLoggedIn: true, user: userData });
  };

  const logout = () => {
    setUserState(INITIAL_STATE);
  };

  return (
    <UserContext.Provider value={{ ...userState, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
