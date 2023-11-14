import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideNavbar from "../../components/sideNavbar";
import CustomNavbar from "../../components/navbar";
import TransactionCategoryModal from "../../screens/modal/index";
import getUserByID from "../service/firebase/getUserByID";
import { getTransactionCategory } from "../service/firebase/transaction";
import { auth } from "../firebaseConfig";

const ProtectRoute = ({ user }) => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentUsername, setCurrrentUsername] = useState("");
  const [currentProfileImage, setCurrentProfileImage] = useState("");
  const [expenseCategoryData, setExpenseCategoryData] = useState([]);
  const [incomeCategoryData, setIncomeCategoryData] = useState([]);
  const [currentUserID, setCurrentUserID] = useState("");

  const toggle = () => setModal(!modal);

  useEffect(() => {
    authChangeHanlder();
  }, []);

  const authChangeHanlder = () => {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setCurrentUserID(currentUser.uid);
        await getTransactionCategoryHandler(currentUser.uid);
        await getUserByIDHanlder(currentUser.uid);
      }
    });
  };

  //for account setting page real time
  const getUserByIDHanlder = (currentUser) => {
    getUserByID(currentUser).then((res) => {
      console.log("=====");
      res.forEach((element) => {
        setCurrrentUsername(element.data().username);
        setCurrentProfileImage(element.data().profileURL);
      });
    });
  };

  //for transaction page real time
  const getTransactionCategoryHandler = (currentUser) => {
    let tempExpenseCategoryData = [];
    let tempIncomeCategoryData = [];
    getTransactionCategory(currentUser).then((res) => {
      console.log("-------------------");
      res.forEach((element) => {
        if (element.data().category === "expense") {
          tempExpenseCategoryData.push(element.data());
        } else {
          tempIncomeCategoryData.push(element.data());
        }
      });
      setExpenseCategoryData(tempExpenseCategoryData);
      setIncomeCategoryData(tempIncomeCategoryData);
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
          toggle={toggle}
        />
        <div className="layout-page">
          <CustomNavbar
            setSideBarToggle={setSideBarToggle}
            currentUsername={currentUsername}
            currentProfileImage={currentProfileImage}
            currentUserID={currentUserID}
          />
          <TransactionCategoryModal
            modal={modal}
            toggle={toggle}
            getTransactionCategoryHandler={getTransactionCategoryHandler}
            incomeCategoryData={incomeCategoryData}
            expenseCategoryData={expenseCategoryData}
            currentUserID={currentUserID}
          />
          <Outlet
            context={[
              currentUserID,
              getUserByIDHanlder,
              expenseCategoryData,
              incomeCategoryData,
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default ProtectRoute;
