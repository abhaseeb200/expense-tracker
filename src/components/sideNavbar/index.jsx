import "./style.css";
import logo from "../../assets/logo.svg";
import "boxicons";
import { Link, NavLink } from "react-router-dom";
import { Button, Offcanvas } from "reactstrap";
import { useState } from "react";

const SideNavbar = ({ sideBarToggle, setSideBarToggle }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });
  return (
    <>
      {screenWidth <= "1200" ? (
        <Offcanvas
          isOpen={sideBarToggle}
          toggle={() => setSideBarToggle(!sideBarToggle)}
        >
          <div
            className="layout-menu menu-vertical menu bg-menu-theme visible"
            tabndex="-1"
          >
            <aside>
              <div className="app-brand demo">
                <a href="" className="app-brand-link">
                  <span className="app-brand-logo demo">
                    <img src={logo} alt="logo" width="40px" />
                  </span>
                  <span className="app-brand-text demo menu-text fw-bolder">
                    Xpensr
                  </span>
                </a>
                <a
                  href=""
                  id="dashboard-close"
                  className="layout-menu-toggle menu-link text-large ms-auto d-xl-none"
                >
                  <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
              </div>
              <div className="menu-inner-shadow"></div>
              <ul className="menu-inner py-1 nav">
                <li className="menu-item">
                  <NavLink to="/" className="menu-link nav-link">
                    {({ isActive }) => (
                      <>
                        <box-icon
                          size="sm"
                          name="home-circle"
                          color={isActive ? "#696cff" : "#697a8d "}
                          style={{ width: "19px" }}
                        ></box-icon>
                        <div className="ms-2">Dashboard</div>
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="menu-header small text-uppercase">
                  <span className="menu-header-text">Transaction</span>
                </li>
                <li className="menu-item">
                  <NavLink to="/transaction" className="menu-link nav-link">
                    {({ isActive }) => (
                      <>
                        <box-icon
                          size="sm"
                          name="book-add"
                          color={isActive ? "#696cff" : "#697a8d "}
                          style={{ width: "19px" }}
                        ></box-icon>
                        <div className="ms-2">Entry</div>
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="menu-item">
                  <a href="" className="menu-link">
                    <box-icon
                      size="sm"
                      name="category"
                      color="#697a8d"
                      style={{ width: "19px" }}
                    ></box-icon>
                    <div className="ms-2">Custom Categories</div>
                  </a>
                </li>
                <li className="menu-header small text-uppercase">
                  <span className="menu-header-text">Budget</span>
                </li>
                <li className="menu-item">
                  <NavLink to="/budget" className="menu-link nav-link">
                    {({ isActive }) => (
                      <>
                        <box-icon
                          size="sm"
                          name="book-add"
                          color={isActive ? "#696cff" : "#697a8d "}
                          style={{ width: "19px" }}
                        ></box-icon>
                        <div className="ms-2">Budget Entry</div>
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="menu-header small text-uppercase">
                  <span className="menu-header-text">Visualization</span>
                </li>
                <li className="menu-item">
                  <NavLink to="/report" className="menu-link nav-link">
                    {({ isActive }) => (
                      <>
                        <box-icon
                          size="sm"
                          name="dock-top"
                          color={isActive ? "#696cff" : "#697a8d "}
                          style={{ width: "19px" }}
                        ></box-icon>
                        <div className="ms-2">Report Generation</div>
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="menu-header small text-uppercase">
                  <span className="menu-header-text">Profile</span>
                </li>
                <li className="menu-item">
                  <NavLink to="/account" className="menu-link nav-link">
                    {({ isActive }) => (
                      <>
                        <box-icon
                          size="sm"
                          name="lock-open-alt"
                          color={isActive ? "#696cff" : "#697a8d "}
                          style={{ width: "19px" }}
                        ></box-icon>
                        <div className="ms-2">Account Settings</div>
                      </>
                    )}
                  </NavLink>
                </li>
              </ul>
            </aside>
          </div>
        </Offcanvas>
      ) : (
        <div
          className="layout-menu menu-vertical menu bg-menu-theme visible"
          tabndex="-1"
        >
          <aside>
            <div className="app-brand demo">
              <a href="" className="app-brand-link">
                <span className="app-brand-logo demo">
                  <img src={logo} alt="logo" width="40px" />
                </span>
                <span className="app-brand-text demo menu-text fw-bolder">
                  Xpensr
                </span>
              </a>
              <a
                href=""
                id="dashboard-close"
                className="layout-menu-toggle menu-link text-large ms-auto d-xl-none"
              >
                <i className="bx bx-chevron-left bx-sm align-middle"></i>
              </a>
            </div>
            <div className="menu-inner-shadow"></div>
            <ul className="menu-inner py-1 nav">
              <li className="menu-item">
                <NavLink to="/" className="menu-link nav-link">
                  {({ isActive }) => (
                    <>
                      <box-icon
                        size="sm"
                        name="home-circle"
                        color={isActive ? "#696cff" : "#697a8d "}
                        style={{ width: "19px" }}
                      ></box-icon>
                      <div className="ms-2">Dashboard</div>
                    </>
                  )}
                </NavLink>
              </li>
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">Transaction</span>
              </li>
              <li className="menu-item">
                <NavLink to="/transaction" className="menu-link nav-link">
                  {({ isActive }) => (
                    <>
                      <box-icon
                        size="sm"
                        name="book-add"
                        color={isActive ? "#696cff" : "#697a8d "}
                        style={{ width: "19px" }}
                      ></box-icon>
                      <div className="ms-2">Entry</div>
                    </>
                  )}
                </NavLink>
              </li>
              <li className="menu-item">
                <a href="" className="menu-link">
                  <box-icon
                    size="sm"
                    name="category"
                    color="#697a8d"
                    style={{ width: "19px" }}
                  ></box-icon>
                  <div className="ms-2">Custom Categories</div>
                </a>
              </li>
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">Budget</span>
              </li>
              <li className="menu-item">
                <NavLink to="/budget" className="menu-link nav-link">
                  {({ isActive }) => (
                    <>
                      <box-icon
                        size="sm"
                        name="book-add"
                        color={isActive ? "#696cff" : "#697a8d "}
                        style={{ width: "19px" }}
                      ></box-icon>
                      <div className="ms-2">Budget Entry</div>
                    </>
                  )}
                </NavLink>
              </li>
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">Visualization</span>
              </li>
              <li className="menu-item">
                <NavLink to="/report" className="menu-link nav-link">
                  {({ isActive }) => (
                    <>
                      <box-icon
                        size="sm"
                        name="dock-top"
                        color={isActive ? "#696cff" : "#697a8d "}
                        style={{ width: "19px" }}
                      ></box-icon>
                      <div className="ms-2">Report Generation</div>
                    </>
                  )}
                </NavLink>
              </li>
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">Profile</span>
              </li>
              <li className="menu-item">
                <NavLink to="/account" className="menu-link nav-link">
                  {({ isActive }) => (
                    <>
                      <box-icon
                        size="sm"
                        name="lock-open-alt"
                        color={isActive ? "#696cff" : "#697a8d "}
                        style={{ width: "19px" }}
                      ></box-icon>
                      <div className="ms-2">Account Settings</div>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </aside>
        </div>
      )}
    </>
  );
};

export default SideNavbar;
