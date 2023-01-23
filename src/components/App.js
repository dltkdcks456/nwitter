import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import Navigation from "./Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [newName, setNewName] = useState("");
  const [init, setInit] = useState(false);
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setNewName(user.displayName);
  };
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {init ? (
          <Route
            path="*"
            element={
              <AppRouter
                refreshUser={refreshUser}
                isLoggedIn={isLoggedIn}
                userObj={userObj}
              />
            }
          />
        ) : (
          "Initializing..."
        )}
      </Routes>
      {/* <footer>&copy; {new Date().getFullYear()}Nwitter</footer> */}
    </BrowserRouter>
  );
};

export default App;
