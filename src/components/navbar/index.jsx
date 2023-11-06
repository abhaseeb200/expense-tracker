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

const CustNavbar = ({ setSideBarToggle, direction, ...args }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });

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
            <span>Welcome admins</span>
          </div>
          <span>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              direction={direction}
            >
              <DropdownToggle className="rounded-circle p-0 border-0">
                <img src="https://firebasestorage.googleapis.com/v0/b/expense-tracker-3d459.appspot.com/o/profile%2Fasana.png?alt=media&token=212bfdaa-91a9-4283-acf6-b0ca2e79f02f" />
              </DropdownToggle>
              <DropdownMenu {...args}>
                <DropdownItem className="user-navbar">
                  <img src="https://firebasestorage.googleapis.com/v0/b/expense-tracker-3d459.appspot.com/o/profile%2Fasana.png?alt=media&token=212bfdaa-91a9-4283-acf6-b0ca2e79f02f" />
                  <span className="ms-2">admin123</span>
                </DropdownItem>
                <DropdownItem className="logout-btn">
                  <box-icon name="power-off" color="#697a8d" ></box-icon><span className="ms-2">Log Out</span>
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
