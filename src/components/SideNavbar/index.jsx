import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import navbarData from "../../constant/navbar";
import logo from "../../assets/logo.svg";
import "boxicons";
import "./style.css";

const SideNavbar = ({ sideBarToggle, setSideBarToggle }) => {
  const containerRef = useRef(null);

  const handleCancelOffCanvas = () => {
    setSideBarToggle(false);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSideBarToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                        onClick={handleCancelOffCanvas}
                      >
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
