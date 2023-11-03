import { Card, CardBody, Row, Button, Form, Label } from "reactstrap";
import "./style.css";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import CustInput from "../../components/input";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [email, setEmail] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [password, setPassword] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [signUp, setSignUp] = useState({});

  const usernameHanlder = (e) => {
    if (e.target.value.trim() === "") {
      setUsername({
        value: e.target.value,
        isError: true,
        messageError: "Please enter your username",
      });
    } else if (e.target.value.match(/[A-Z]/)) {
      setUsername({
        value: e.target.value,
        isError: true,
        messageError: "Username must be lowercase letters",
      });
    } else if (e.target.value.trim().length <= 3) {
      setUsername({
        value: e.target.value,
        isError: true,
        messageError: "Username should be greater than 3",
      });
    } else if (!e.target.value.trim().match(/^\S*$/)) {
      setUsername({
        value: e.target.value,
        isError: true,
        messageError: "Username should not contain spaces",
      });
    } else {
      setUsername({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const emailHanlder = (e) => {
    if (e.target.value.trim() === "") {
      setEmail({
        value: e.target.value,
        isError: true,
        messageError: "Please enter your email address.",
      });
    } else if (
      !e.target.value
        .trim()
        .charAt(0)
        .match(/[a-zA-Z/]/)
    ) {
      setEmail({
        value: e.target.value,
        isError: true,
        messageError: "Email must start with a letter",
      });
    } else if (e.target.value.charAt(e.target.value.length - 4) === "@") {
      setEmail({
        value: e.target.value,
        isError: true,
        messageError: "@ isn't used in last 4 charactor",
      });
    } else {
      setEmail({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const passwordHanlder = (e) => {
    if (e.target.value.trim() === "") {
      setPassword({
        value: e.target.value,
        isError: true,
        messageError: "Please enter your password",
      });
    } else if (e.target.value.trim().length < 6) {
      setPassword({
        value: e.target.value,
        isError: true,
        messageError: "Password should be greater than 6",
      });
    } else if (!e.target.value.match(/[a-zA-Z/]/)) {
      setPassword({
        value: e.target.value,
        isError: true,
        messageError: "Password required Alphabats",
      });
    } else if (!e.target.value.match(/[0-9]/)) {
      setPassword({
        value: e.target.value,
        isError: true,
        messageError: "Password required Numbers",
      });
    } else if (!e.target.value.match(/[!@#$%^&*]/)) {
      setPassword({
        value: e.target.value,
        isError: true,
        messageError: "Password required Special Character",
      });
    } else {
      setPassword({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }

    if (e.target.value !== "") {
      if (
        e.target.value !== confirmPassword.value &&
        confirmPassword.value !== ""
      ) {
        setConfirmPassword({
          value: confirmPassword.value,
          isError: true,
          messageError: "Password does't match",
        });
      } else {
        setConfirmPassword({
          value: confirmPassword.value,
          isError: false,
          messageError: "",
        });
      }
    }
  };

  const confirmPasswordHanlder = (e) => {
    if (e.target.value === "") {
      setConfirmPassword({
        value: e.target.value,
        isError: true,
        messageError: "Password can't be empty",
      });
    } else if (e.target.value !== password.value) {
      setConfirmPassword({
        value: e.target.value,
        isError: true,
        messageError: "Password does't match",
      });
    } else {
      setConfirmPassword({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    if (username.value === "") {
      setUsername({
        value: username.value,
        isError: true,
        messageError: "Please enter your username",
      });
    }
    if (email.value === "") {
      setEmail({
        value: email.value,
        isError: true,
        messageError: "Please enter your email address",
      });
    }
    if (password.value === "") {
      setPassword({
        value: password.value,
        isError: true,
        messageError: "Please enter your password",
      });
    }
    if (confirmPassword.value === "") {
      setConfirmPassword({
        value: confirmPassword.value,
        isError: true,
        messageError: "Password can't be empty",
      });
    }

    //check validation
    if (
      !username.isError &&
      !email.isError &&
      !password.isError &&
      !confirmPassword.isError
    ) {
      console.log("passed");
    } else {
      console.log("faild");
    }
  };

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
            <h4 className="mb-2">Adventure starts here 🚀</h4>
            <p className="mb-4">Join us and embark on an exciting journey!</p>
            <Form className="mb-3" onSubmit={signUpHandler}>
              <div className="mb-3">
                <Label>Username</Label>
                <CustInput
                  type="text"
                  placeholder="Enter your username"
                  value={username.value}
                  isError={username.isError}
                  messageError={username.messageError}
                  onChange={usernameHanlder}
                />
              </div>
              <div className="mb-3">
                <Label>Email</Label>
                <CustInput
                  type="email"
                  placeholder="Enter your email"
                  value={email.value}
                  isError={email.isError}
                  messageError={email.messageError}
                  onChange={emailHanlder}
                />
              </div>
              <div className="mb-3">
                <Label>Password</Label>
                <CustInput
                  type="password"
                  placeholder="············"
                  value={password.value}
                  isError={password.isError}
                  messageError={password.messageError}
                  onChange={passwordHanlder}
                />
              </div>
              <div className="mb-3">
                <Label>Confirm Password</Label>
                <CustInput
                  type="password"
                  placeholder="············"
                  value={confirmPassword.value}
                  isError={confirmPassword.isError}
                  messageError={confirmPassword.messageError}
                  onChange={confirmPasswordHanlder}
                />
              </div>
              <Button color="primary" className="w-100" type="submit">
                Sign up
              </Button>
            </Form>
            <p className="text-center">
              <span className="me-1">Already have an account?</span>
              <Link to="/login" replace>Sign in instead</Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Register;
