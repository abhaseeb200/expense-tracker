import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideNavbar from "../../components/sideNavbar";
import CustomNavbar from "../../components/navbar";
import { auth } from "../firebaseConfig";

const ProtectRoute = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);

  const dispatch = useDispatch();
  const { userData, isLogin } = useSelector((state) => state.auth);

  // const authChangeHanlder = () => {
  //   auth.onAuthStateChanged(async (currentUser) => {
  //     if (currentUser) {
  //     }
  //   });
  // };

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="container-lg">
        <SideNavbar
          sideBarToggle={sideBarToggle}
          setSideBarToggle={setSideBarToggle}
        />
        <div className="layout-page">
          <CustomNavbar setSideBarToggle={setSideBarToggle} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProtectRoute;
