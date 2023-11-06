import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "../screens/login";
import Register from "../screens/register";
import Dashboard from "../screens/home/dashboard";
import Transaction from "../screens/home/transaction";
import Budget from "../screens/home/budget";
import Report from "../screens/home/report";
import Account from "../screens/home/account-setting";
import { useState } from "react";

const ProtectRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  } 
  return <Outlet />;
};

const Confiq = () => {
  const [user, setUser] = useState({ id: "1", name: "robin" });

  // const handleLogin = () => setUser({ id: "1", name: "robin" });
  // const handleLogout = () => setUser(null);

  return (
    <Router>
      <Routes>
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/report" element={<Report />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Confiq;
