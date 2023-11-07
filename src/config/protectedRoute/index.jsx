import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebaseConfig";

const ProtectRoute = ({ user, children, setUser }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectRoute;
