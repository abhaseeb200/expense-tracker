import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Label,
  Navbar,
} from "reactstrap";
import SideNavbar from "../../../components/sideNavbar";
import CustNavbar from "../../../components/navbar";
import { useState } from "react";
import CustomInput from "../../../components/input";

const Account = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("admin@gmail.com");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const usernameHandler = (e) => {
    // setUsername(e.target.value);
  };

  const phoneHandler = (e) => {
    setPhone(e.target.value);
  };

  const addressHandler = (e) => {
    setAddress(e.target.value);
  };

  const saveChangesHanlder = () => {};

  return (
    <div className="container-lg">
      <SideNavbar
        sideBarToggle={sideBarToggle}
        setSideBarToggle={setSideBarToggle}
      />
      <div className="layout-page">
        <CustNavbar setSideBarToggle={setSideBarToggle} />
        <Card className="mt-4">
          <CardBody className="pb-0">
            <CardTitle>Profile Details</CardTitle>
            <div className="d-flex align-items-start align-items-sm-center gap-4">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/expense-tracker-3d459.appspot.com/o/profile%2Fasana.png?alt=media&token=212bfdaa-91a9-4283-acf6-b0ca2e79f02f"
                className="d-block rounded"
                height="100"
                width="100"
              />
              <div className="button-wrapper">
                <label class="btn btn-primary me-2 mb-4" tabindex="0">
                  <CustomInput type="file"/>
                  <span class="d-block text-white">Upload new photo</span>
                </label>
                <p className="text-muted mb-0">Allowed JPG, GIF or PNG.</p>
              </div>
            </div>
          </CardBody>
          <CardBody className="pt-3 row">
            <div className="col-md-6 mb-3">
              <Label>First name</Label>
              <CustomInput
                placeholder="John"
                type="text"
                value={firstName}
                onChange={firstNameHandler}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label>last name</Label>
              <CustomInput
                placeholder="Doe"
                type="text"
                value={lastName}
                onChange={lastNameHandler}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label>e-mail</Label>
              <CustomInput
                disabled="disabled"
                placeholder=""
                type="email"
                value={email}
                onChange={emailHandler}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label>username</Label>
              <CustomInput
                placeholder="example"
                type="text"
                value={username.value}
                isError={username.isError}
                messageError={username.messageError}
                onChange={usernameHandler}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label>Phone number</Label>
              <CustomInput
                placeholder="+1 234 456"
                type="number"
                value={phone}
                onChange={phoneHandler}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label>address</Label>
              <CustomInput
                placeholder="123 Main St, Apt 4B, City"
                type="text"
                value={address}
                onChange={addressHandler}
              />
            </div>
            <div className="col-md-12 w-100">
              <Button
                color="primary"
                className="w-100"
                onClick={saveChangesHanlder}
              >
                Save changes
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Account;
