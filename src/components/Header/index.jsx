import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import SwitchTheme from "../switchTheme";
import { authLogout } from "../../config/service/firebase/auth";
import { logoutReducer } from "../../feature/auth/userSlice";
import avatarImg from "../../assets/1.png";
import "boxicons";
import "./style.css";

const Header = ({ setSideBarToggle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });

  const handleLogout = async () => {
    try {
      await authLogout();
      await localStorage.clear();
      await dispatch(logoutReducer());
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="w-100 mt-3">
      <CardBody className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-inline-flex">
            {screenWidth <= "1200" && (
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
            )}
            <span>Welcome {userData?.username}</span>
          </div>
          <span className="d-flex gap-3 align-items-center">
            <SwitchTheme />
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle className="rounded-circle p-0 border-0">
                <img
                  src={userData?.profileURL || avatarImg}
                  className="w-px-40 rounded-circle object-fit-cover"
                />
              </DropdownToggle>
              <DropdownMenu>
                <Link to="/account">
                  <DropdownItem className="user-navbar">
                    <img
                      src={userData?.profileURL || avatarImg}
                      className="w-px-40 rounded-circle object-fit-cover"
                    />
                    <span className="ms-2">{userData?.username}</span>
                  </DropdownItem>
                </Link>
                <DropdownItem className="logout-btn" onClick={handleLogout}>
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

export default Header;