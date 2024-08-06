import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../screens/login";
import Dashboard from "../../screens/dashboard";
import Budget from "../../screens/budget";
import Report from "../../screens/report";
import Account from "../../screens/account-setting";
import Category from "../../screens/category";
import NoMatch from "../../screens/no-match";
import SignUp from "../../screens/sign-up";
import Expense from "../../screens/expense";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import Transaction from "../../screens/transaction";
import { auth } from "../firebaseConfig";

const Main = () => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
      }
    });
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* ======================= PRIVATE ROUTES ======================= */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/category" element={<Category />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/report" element={<Report />} />
          <Route path="/account" element={<Account />} />
        </Route>

        {/* ======================= PUBLIC ROUTES ======================= */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Route>

        {/* ======================= PAGE NOT FOUND - 404 ======================= */}
        <Route path="*" element={<NoMatch />}></Route>
      </Routes>
    </Router>
  );
};

export default Main;
