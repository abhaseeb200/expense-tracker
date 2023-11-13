import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebaseConfig";
import SideNavbar from "../../components/sideNavbar";
import CustNavbar from "../../components/navbar";
import TransactionCategoryModal from "../../screens/home/modal";

const ProtectRoute = ({ user }) => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  console.log(user, " ==== local user PRIVATE");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <>
      <div className="container-lg">
        <SideNavbar
          sideBarToggle={sideBarToggle}
          setSideBarToggle={setSideBarToggle}
          toggle={toggle}
        />
        <div className="layout-page">
          <CustNavbar setSideBarToggle={setSideBarToggle} />
          <TransactionCategoryModal modal={modal} toggle={toggle} />
          <Outlet/>
        </div>
      </div>
    </>
  );
};

export default ProtectRoute;
