import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import navbarData from "../../constant/navbar";
import { authLogout } from "../../config/service/firebase/auth";
import { logoutReducer } from "../../feature/auth/userSlice";
import logo from "../../assets/logo.svg";
import "./style.css";

const SideNavbar = ({ sideBarToggle, setSideBarToggle }) => {
  const containerRef = useRef(null);
  
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state?.themeMode);

  const handleCancelOffCanvas = () => {
    setSideBarToggle(false);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSideBarToggle(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authLogout();
      await dispatch(logoutReducer());
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (sideBarToggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sideBarToggle]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={`layout-menu menu-vertical menu bg-menu-theme visible z-3 ${
          sideBarToggle && "isActive"
        }`}
      >
        <aside>
          <div className="app-brand demo">
            <Link href="#" className="app-brand-link">
              <span className="app-brand-logo demo">
                <img src={logo} alt="logo" width="40px" />
              </span>
              <span className="app-brand-text demo menu-text fw-bolder">
                Xpensr
              </span>
            </Link>
          </div>

          <div className="menu-inner-shadow"></div>

          <ul className="menu-inner py-1 nav">
            {navbarData?.map((navbar) => {
              return (
                <React.Fragment key={navbar?.id}>
                  {navbar?.isLine ? (
                    <li className="menu-header small text-uppercase">
                      <span className="menu-header-text">{navbar?.title}</span>
                    </li>
                  ) : (
                    <li className="menu-item">
                      <NavLink
                        to={navbar?.to}
                        className={navbar?.className}
                        onClick={
                          navbar?.title === "Logout"
                            ? handleLogout
                            : handleCancelOffCanvas
                        }
                      >
                        <box-icon
                          name={navbar?.icon}
                          color={isDarkMode ? "#d5d5e2" : "#697a8d"}
                          role="button"
                        ></box-icon>
                        <div className="ms-2">{navbar?.title}</div>
                      </NavLink>
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </aside>
      </div>
      {sideBarToggle && <div className="overlay-bg"></div>}
    </>
  );
};

export default SideNavbar;
