import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebaseConfig";
import SideNavbar from "../../components/sideNavbar";
import CustomNavbar from "../../components/navbar";
import TransactionCategoryModal from "../../screens/home/modal";
import getUserByID from "../service/firebase/getUserByID";
import { getTransactionCategory } from "../service/firebase/transaction";

const ProtectRoute = ({ user }) => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentUsername, setCurrrentUsername] = useState("");
  const [currentProfileImage, setCurrentProfileImage] = useState("");
  const [expenseCategoryData, setExpenseCategoryData] = useState([]);
  const [incomeCategoryData, setIncomeCategoryData] = useState([]);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    getUserByIDHanlder();
    getTransactionCategoryHandler();
  }, []);

  //for account setting page real time
  const getUserByIDHanlder = () => {
    getUserByID().then((res) => {
      res.forEach((element) => {
        setCurrrentUsername(element.data().username);
        setCurrentProfileImage(element.data().profileURL);
      });
    });
  };

  //for transaction page real time
  const getTransactionCategoryHandler = () => {
    let tempExpenseCategoryData = [];
    let tempIncomeCategoryData = [];
    getTransactionCategory().then((res) => {
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
          />
          <TransactionCategoryModal
            modal={modal}
            toggle={toggle}
            getTransactionCategoryHandler={getTransactionCategoryHandler}
            incomeCategoryData = {incomeCategoryData}
            expenseCategoryData = {expenseCategoryData}
          />
          <Outlet
            context={[
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
