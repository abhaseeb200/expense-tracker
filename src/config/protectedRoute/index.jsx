import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebaseConfig";

const ProtectRoute = ({ user }) => {
  console.log(user,"local user PRIVATE");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectRoute;
