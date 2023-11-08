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
import { onAuthStateChanged } from 'firebase/auth';

const Config = () => {
  let currentLocalUser = localStorage.getItem("currentUser")
  const [localUser , setLocalUser] = useState(currentLocalUser);

  useEffect(()=>{
    // auth.onAuthStateChanged((currentUser)=> {
    //     console.log(currentUser);
    // })
    // console.log(localUser);
    // if (localUser) {
    //   setLocalUser(currentLocalUser)
    // } else {
    //   setLocalUser(null)
    // }
  },[])
  


  return (
    <Router>
      <Routes>
        <Route element={<ProtectRoute localUser={localUser} setLocalUser={setLocalUser} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/report" element={<Report />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route
          path="/login"
          element={<Login localUser={localUser} setLocalUser={setLocalUser} />}
        />
        <Route
          path="/register"
          element={<Register localUser={localUser} setLocalUser={setLocalUser} />}
        />
      </Routes>
    </Router>
  );
};

export default Config;
