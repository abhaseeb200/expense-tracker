import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../screens/login";
import Register from "../screens/register";
import Dashboard from "../screens/home/dashboard";
import Transaction from "../screens/home/transaction";
import Budget from "../screens/home/budget";
import Report from "../screens/home/report";
import Account from "../screens/home/account-setting";

const Confiq = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/report" element={<Report />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default Confiq;
