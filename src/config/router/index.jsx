import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../screens/login";
import Dashboard from "../../screens/dashboard";
import Transaction from "../../screens/transaction";
import Budget from "../../screens/budget";
import Report from "../../screens/report";
import Account from "../../screens/account-setting";
import Category from "../../screens/category";
import ProtectRoute from "../protectedRoute";
import { auth } from "../firebaseConfig";
import SignUp from "../../screens/sign-up";

const Main = () => {
  let getLocalUser = localStorage.getItem("currentUser");
  const [user, setUser] = useState(getLocalUser);
  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        localStorage.setItem("currentUser", currentUser.uid);
        setUser(currentUser.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route element={<ProtectRoute user={user} setUser={setUser} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transactionCategories" element={<Category />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/report" element={<Report />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route
          path="/register"
          element={<SignUp user={user} setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
};

export default Main;
