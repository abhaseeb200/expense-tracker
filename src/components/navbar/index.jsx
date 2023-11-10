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
import { useEffect, useState } from "react";
import "boxicons";
import { authLogout } from "../../config/service/firebase/auth";
import { useNavigate } from "react-router-dom";
import getUserByID from "../../config/service/firebase/getUserByID";
import { auth } from "../../config/firebaseConfig";
import avatarImg from '../../assets/1.png'

const CustNavbar = ({ getUserByIDHandler,setSideBarToggle, direction, ...args }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [username,setUsername] = useState("")
  const [loader,setLoader] = useState(false)
  const [profileImage,setProfileImage] = useState(false)
  const navigate = useNavigate();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(()=> {
    setLoader(true)
    getUserByID().then((res)=> {
      res.forEach(element => {
        setUsername(element.data().username)
        setProfileImage(element.data().profileURL)
        setLoader(false)
      });
    });
  },[])

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
        console.log(err);
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
            <span>{loader?"loading...":`Welcome ${username}`}</span>
          </div>
          <span>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              direction={direction}
            >
              <DropdownToggle className="rounded-circle p-0 border-0">
                <img src={profileImage || avatarImg} className="w-px-40 rounded-circle"/>
              </DropdownToggle>
              <DropdownMenu {...args}>
                <DropdownItem className="user-navbar">
                  <img src={profileImage || avatarImg} className="w-px-40 rounded-circle" />
                  <span className="ms-2">{username}</span>
                </DropdownItem>
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

export default CustNavbar;
