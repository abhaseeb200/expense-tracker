import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "../../screens/login";
import Register from "../../screens/register";
import Dashboard from "../../screens/home/dashboard";
import Transaction from "../../screens/home/transaction";
import Budget from "../../screens/home/budget";
import Report from "../../screens/home/report";
import Account from "../../screens/home/account-setting";
import { useEffect, useState } from "react";
import ProtectRoute from "../protectedRoute";
import { auth } from "../firebaseConfig";

const Config = () => {
  const [user, setUser] = useState("ss");

  return (
    <Router>
      <Routes>
        <Route element={<ProtectRoute user={user} setUser={setUser} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
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
          element={<Register user={user} setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
};

export default Config;
