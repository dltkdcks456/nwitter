import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navigation from "./Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
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
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Routes>
        {init ? (
          <Route
            path="*"
            element={<AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />}
          />
        ) : (
          "Initializing..."
        )}
      </Routes>
      <footer>&copy; {new Date().getFullYear()}Nwitter</footer>
    </BrowserRouter>
  );
};

export default App;
