import {
  Button,
  Card,
  CardBody,
  CardText,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import "./style.css";
import { useState } from "react";
import "boxicons";
import { authLogout } from "../../config/service/firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import avatarImg from "../../assets/1.png";
import { toast } from "react-toastify";

const CustomNavbar = ({
  currentUsername,
  currentProfileImage,
  setSideBarToggle,
  direction,
  ...args
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });

  const logoutHanlder = () => {
    authLogout()
      .then(() => {
        localStorage.clear();
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        toast.error(err, {
          autoClose: 1500,
        });
      });
  };

  return (
    <Card className="w-100 mt-3">
      <CardBody className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-inline-flex">
            {screenWidth <= "1200" ? (
              <box-icon
                name="menu"
                color="#697a8d"
                onClick={() => setSideBarToggle(true)}
                style={{
                  width: "26px",
                  cursor: "pointer",
                  marginRight: "15px",
                }}
              ></box-icon>
            ) : (
              ""
            )}
            <span>Welcome {currentUsername}</span>
          </div>
          <span>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              direction={direction}
            >
              <DropdownToggle className="rounded-circle p-0 border-0">
                <img
                  src={currentProfileImage || avatarImg}
                  className="w-px-40 rounded-circle"
                />
              </DropdownToggle>
              <DropdownMenu {...args}>
                <Link to="/account">
                  <DropdownItem className="user-navbar">
                    <img
                      src={currentProfileImage || avatarImg}
                      className="w-px-40 rounded-circle"
                    />
                    <span className="ms-2">{currentUsername}</span>
                  </DropdownItem>
                </Link>
                <DropdownItem className="logout-btn" onClick={logoutHanlder}>
                  <box-icon name="power-off" color="#697a8d"></box-icon>
                  <span className="ms-2">Log Out</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default CustomNavbar;
