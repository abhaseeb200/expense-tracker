import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideNavbar from "../../components/sideNavbar";
import CustomNavbar from "../../components/navbar";
import getUserByID from "../service/firebase/getUserByID";
import { auth } from "../firebaseConfig";
import { getUserProfile } from "../../feature/auth/userSlice";

const ProtectRoute = ({ user }) => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [currentUserID, setCurrentUserID] = useState("");

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    authChangeHanlder();
  }, []);

  const authChangeHanlder = () => {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setCurrentUserID(currentUser.uid);
        // await getUserByIDHanlder(currentUser.uid);
      }
    });
  };

  // for account setting page real time
  const getUserByIDHanlder = (currentUser) => {
    // if (!userData?.email) {
    //   let data = {};
    //   getUserByID(currentUser).then((res) => {
    //     res.forEach((element) => {
    //       data = {
    //         ...element.data(),
    //         docID: element.id,
    //       };
    //       dispatch(getUserProfile(data));
    //     });
    //   });
    // }
  };

  if (!user) {
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
          <Outlet context={[currentUserID, getUserByIDHanlder]} />
        </div>
      </div>
    </>
  );
};

export default ProtectRoute;
