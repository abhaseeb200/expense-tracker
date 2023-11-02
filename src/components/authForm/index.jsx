import CustInput from "../input";
import { Card, CardBody, Row, Button, Form, Label } from "reactstrap";
import "./style.css";
import logo from "../../assets/logo.svg";
import { useState } from "react";

const CustForm = ({ heading, text, bottomText, linkText }) => {
  const [username, setUsername] = useState({value:"",isError:false,messageError:""});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const usernameHanlder = (e) => {
        
    if (e.target.value.trim() === "") {
      setUsername({isError:true})
    } else {
      setUsername({isError:false})
    }
  };

  const emailHanlder = () => {};

  const passwordHanlder = () => {};

  const confirmPasswordHanlder = () => {};

  return (
    <div className="authentication-wrapper authentication-basic">
      <div className="authentication-inner">
        <Card>
          <CardBody>
            <Row className="logo-row">
              <span className="app-brand-text">
                <img src={logo} width="45px" /> xpensr
              </span>
            </Row>
            <h4 className="mb-2">{heading}</h4>
            <p className="mb-4">{text}</p>
            <Form className="mb-3">
              <Label>Username</Label>
              <CustInput
                type="text"
                placeholder="Enter your username"
                value={username.value}
                isError={username.isError}
                messageError={username.messageError}
                onChange={usernameHanlder}
              />
              <Label>Email</Label>
              <CustInput
                type="email"
                placeholder="Enter your email"
                value=""
                onChange={emailHanlder}
              />
              <Label>Password</Label>
              <CustInput
                type="password"
                placeholder="············"
                value=""
                onChange={passwordHanlder}
              />
              <Label>Confirm Password</Label>
              <CustInput
                type="password"
                placeholder="············"
                value=""
                onChange={confirmPasswordHanlder}
              />
              <Button color="primary" className="w-100" type="submit">
                Sign up
              </Button>
            </Form>
            <p className="text-center">
              <span className="me-1">{bottomText}</span>
              <a href="">{linkText}</a>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CustForm;
