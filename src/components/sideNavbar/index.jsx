import "./style.css";
import logo from "../../assets/logo.svg";
import "boxicons";
import { Link, NavLink } from "react-router-dom";
import { Button, Offcanvas } from "reactstrap";
import { useState } from "react";
import RouteLink from "../routeLink";

const SideNavbar = ({ sideBarToggle, setSideBarToggle, toggle }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });

  const OffCanvasCancelHanlder = () => {
    setSideBarToggle(false);
  };
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
                <li className="menu-item">
                  <NavLink
                    to="/"
                    className="menu-link nav-link"
                    onClick={OffCanvasCancelHanlder}
                  >
                    {({ isActive }) => (
                      <RouteLink
                        name="Dashboards"
                        icon="home-circle"
                        isActive={isActive}
                      />
                    )}
                  </NavLink>
                </li>
                <li className="menu-header small text-uppercase">
                  <span className="menu-header-text">Transaction</span>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/transaction"
                    className="menu-link nav-link"
                    onClick={OffCanvasCancelHanlder}
                  >
                    {({ isActive }) => (
                      <RouteLink
                        name="Entry"
                        icon="book-add"
                        isActive={isActive}
                      />
                    )}
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/transactionCategories"
                    className="menu-link nav-link"
                    onClick={OffCanvasCancelHanlder}
                  >
                    {({ isActive }) => (
                      <RouteLink
                        name="Custom Categories"
                        icon="category"
                        isActive={isActive}
                      />
                    )}
                  </NavLink>
                </li>
                <li className="menu-header small text-uppercase">
                  <span className="menu-header-text">Budget</span>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/budget"
                    className="menu-link nav-link"
                    onClick={OffCanvasCancelHanlder}
                  >
                    {({ isActive }) => (
                      <RouteLink
                        name="Budget Entry"
                        icon="book-add"
                        isActive={isActive}
                      />
                    )}
                  </NavLink>
                </li>
                <li className="menu-header small text-uppercase">
                  <span className="menu-header-text">Visualization</span>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/report"
                    className="menu-link nav-link"
                    onClick={OffCanvasCancelHanlder}
                  >
                    {({ isActive }) => (
                      <RouteLink
                        name="Report Generation"
                        icon="dock-top"
                        isActive={isActive}
                      />
                    )}
                  </NavLink>
                </li>
                <li className="menu-header small text-uppercase">
                  <span className="menu-header-text">Profile</span>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/account"
                    className="menu-link nav-link"
                    onClick={OffCanvasCancelHanlder}
                  >
                    {({ isActive }) => (
                      <RouteLink
                        name="Account Settings"
                        icon="lock-open-alt"
                        isActive={isActive}
                      />
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
              <Link href="#" className="app-brand-link">
                <span className="app-brand-logo demo">
                  <img src={logo} alt="logo" width="40px" />
                </span>
                <span className="app-brand-text demo menu-text fw-bolder">
                  Xpensr
                </span>
              </Link>
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
                <NavLink
                  to="/"
                  className="menu-link nav-link"
                  onClick={OffCanvasCancelHanlder}
                >
                  {({ isActive }) => (
                    <RouteLink
                      name="Dashboards"
                      icon="home-circle"
                      isActive={isActive}
                    />
                  )}
                </NavLink>
              </li>
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">Transaction</span>
              </li>
              <li className="menu-item">
                <NavLink
                  to="/transaction"
                  className="menu-link nav-link"
                  onClick={OffCanvasCancelHanlder}
                >
                  {({ isActive }) => (
                    <RouteLink
                      name="Entry"
                      icon="book-add"
                      isActive={isActive}
                    />
                  )}
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  to="/transactionCategories"
                  className="menu-link nav-link"
                  onClick={OffCanvasCancelHanlder}
                >
                  {({ isActive }) => (
                    <RouteLink
                      name="Custom Categories"
                      icon="category"
                      isActive={isActive}
                    />
                  )}
                </NavLink>
              </li>
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">Budget</span>
              </li>
              <li className="menu-item">
                <NavLink
                  to="/budget"
                  className="menu-link nav-link"
                  onClick={OffCanvasCancelHanlder}
                >
                  {({ isActive }) => (
                    <RouteLink
                      name="Budget Entry"
                      icon="book-add"
                      isActive={isActive}
                    />
                  )}
                </NavLink>
              </li>
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">Visualization</span>
              </li>
              <li className="menu-item">
                <NavLink
                  to="/report"
                  className="menu-link nav-link"
                  onClick={OffCanvasCancelHanlder}
                >
                  {({ isActive }) => (
                    <RouteLink
                      name="Report Generation"
                      icon="dock-top"
                      isActive={isActive}
                    />
                  )}
                </NavLink>
              </li>
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">Profile</span>
              </li>
              <li className="menu-item">
                <NavLink
                  to="/account"
                  className="menu-link nav-link"
                  onClick={OffCanvasCancelHanlder}
                >
                  {({ isActive }) => (
                    <RouteLink
                      name="Account Settings"
                      icon="lock-open-alt"
                      isActive={isActive}
                    />
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
