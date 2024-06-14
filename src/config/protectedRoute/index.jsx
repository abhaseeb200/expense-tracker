import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import SideNavbar from "../../components/sideNavbar";
import CustomNavbar from "../../components/navbar";
import getUserByID from "../service/firebase/getUserByID";
import { auth } from "../firebaseConfig";
import { getUserProfile } from "../../feature/auth/userSlice";

const ProtectRoute = ({ user }) => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [currentUsername, setCurrrentUsername] = useState("");
  const [currentProfileImage, setCurrentProfileImage] = useState("");
  const [currentUserID, setCurrentUserID] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    authChangeHanlder();
  }, []);

  const authChangeHanlder = () => {
    auth.onAuthStateChanged(async (currentUser) => {
      console.log("onAuth","PROTECT ROUTE");
      if (currentUser) {
        setCurrentUserID(currentUser.uid);
        await getUserByIDHanlder(currentUser.uid);
      }
    });
  };

  //for account setting page real time
  const getUserByIDHanlder = (currentUser) => {
    console.log("getUserByIDHanlder");
    getUserByID(currentUser).then((res) => {
      res.forEach((element) => {
        setCurrrentUsername(element.data().username);
        setCurrentProfileImage(element.data().profileURL);
        dispatch(getUserProfile(element.data()));
      });
    });
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
          <CustomNavbar
            setSideBarToggle={setSideBarToggle}
            currentUsername={currentUsername}
            currentProfileImage={currentProfileImage}
            currentUserID={currentUserID}
          />
          <Outlet context={[currentUserID, getUserByIDHanlder]} />
        </div>
      </div>
    </>
  );
};

export default ProtectRoute;
