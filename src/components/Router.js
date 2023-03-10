import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  console.log(isLoggedIn);
  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Home userObj={userObj} />} />
          <Route
            path="/profile"
            element={<Profile refreshUser={refreshUser} userObj={userObj} />}
          />
        </>
      ) : (
        <Route path="/" element={<Auth />} />
      )}
    </Routes>
  );
};

export default AppRouter;
