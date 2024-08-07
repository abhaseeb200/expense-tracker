import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import SideNavbar from "../../../components/SideNavbar";
import Header from "../../../components/Header";

const PrivateRoute = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);

  const { isLogin } = useSelector((state) => state.auth);

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
          <Header setSideBarToggle={setSideBarToggle} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PrivateRoute;
