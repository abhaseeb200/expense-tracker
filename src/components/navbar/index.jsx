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

const CustNavbar = () => {
  return (
    <Card className="w-100 mt-3">
      <CardBody>
        <div className="d-flex justify-content-between">
          <span>Welcome admins</span>
          <span>
            {/* <UncontrolledDropdown group>
              <DropdownToggle caret color="primary" />
              <img src="https://firebasestorage.googleapis.com/v0/b/expense-tracker-3d459.appspot.com/o/profile%2Fasana.png?alt=media&token=212bfdaa-91a9-4283-acf6-b0ca2e79f02f" alt="" />
              <DropdownMenu>
                <DropdownItem text>Header</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default CustNavbar;
