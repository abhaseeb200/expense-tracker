import { Card, CardBody, Row, Button, Form, Label, Spinner } from "reactstrap";
import "./style.css";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import CustomInput from "../../components/input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authSignUp } from "../../config/service/firebase/auth.js";
import { db } from "../../config/firebaseConfig.js";
import { toast } from "react-toastify";

const Register = ({ user, setUser }) => {
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
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const usernameHanlder = (e) => {
    let usernameVal = e.target.value.trim();
    if (usernameVal === "") {
      setUsername({
        value: usernameVal,
        isError: true,
        messageError: "Please enter your username",
      });
    } else if (usernameVal.match(/[A-Z]/)) {
      setUsername({
        value: usernameVal,
        isError: true,
        messageError: "Username must be lowercase letters",
      });
    } else if (usernameVal.length <= 3) {
      setUsername({
        value: usernameVal,
        isError: true,
        messageError: "Username should be greater than 3",
      });
    } else if (!usernameVal.match(/^\S*$/)) {
      setUsername({
        value: usernameVal,
        isError: true,
        messageError: "Username should not contain spaces",
      });
    } else {
      setUsername({
        value: usernameVal,
        isError: false,
        messageError: "",
      });
    }
  };

  const emailHanlder = (e) => {
    let emailVal = e.target.value.trim();
    if (emailVal === "") {
      setEmail({
        value: emailVal,
        isError: true,
        messageError: "Please enter your email address.",
      });
    } else if (
      !emailVal
        .trim()
        .charAt(0)
        .match(/[a-zA-Z/]/)
    ) {
      setEmail({
        value: emailVal,
        isError: true,
        messageError: "Email must start with a letter",
      });
    } else if (emailVal.charAt(emailVal.length - 4) === "@") {
      setEmail({
        value: emailVal,
        isError: true,
        messageError: "@ isn't used in last 4 charactor",
      });
    } else {
      setEmail({
        value: emailVal,
        isError: false,
        messageError: "",
      });
    }
  };

  const passwordHanlder = (e) => {
    let passwordVal = e.target.value;
    if (passwordVal === "") {
      setPassword({
        value: e.target.value,
        isError: true,
        messageError: "Please enter your password",
      });
    } else if (passwordVal.length < 6) {
      setPassword({
        value: passwordVal,
        isError: true,
        messageError: "Password should be greater than 6",
      });
    } else if (!passwordVal.match(/[a-zA-Z/]/)) {
      setPassword({
        value: passwordVal,
        isError: true,
        messageError: "Password required Alphabats",
      });
    } else if (!passwordVal.match(/[0-9]/)) {
      setPassword({
        value: passwordVal,
        isError: true,
        messageError: "Password required Numbers",
      });
    } else if (!passwordVal.match(/[!@#$%^&*]/)) {
      setPassword({
        value: passwordVal,
        isError: true,
        messageError: "Password required Special Character",
      });
    } else {
      setPassword({
        value: passwordVal,
        isError: false,
        messageError: "",
      });
    }

    if (passwordVal !== "") {
      if (
        passwordVal !== confirmPassword.value &&
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
    let confirmVal = e.target.value;
    if (confirmVal === "") {
      setConfirmPassword({
        value: confirmVal,
        isError: true,
        messageError: "Password can't be empty",
      });
    } else if (confirmVal !== password.value) {
      setConfirmPassword({
        value: confirmVal,
        isError: true,
        messageError: "Password does't match",
      });
    } else {
      setConfirmPassword({
        value: confirmVal,
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

    if (
      username.value === "" ||
      email.value === "" ||
      password.value === "" ||
      confirmPassword.value === ""
    ) {
      return;
    }

    //validation cheeck
    if (
      !username.isError &&
      !email.isError &&
      !password.isError &&
      !confirmPassword.isError
    ) {
      setLoader(true);
      authSignUp(email.value, password.value)
        .then((userCredential) => {
          let user = userCredential.user;
          localStorage.setItem("currentUser", user.uid);
          setUser(user.uid);
          db.collection("users")
            .add({
              username: username.value,
              email: email.value,
              userId: user.uid,
              fname: "",
              lname: "",
              phone: "",
              profileURL: "",
              address: "",
            })
            .then(() => {
              toast.success("Register account successfully!", {
                autoClose: 1500,
              });
              setLoader(false);
              navigate("/", { replace: true });
            })
            .catch((error) => {
              toast.error(error.message, {
                autoClose: 1500,
              });
              setLoader(false);
            });
        })
        .catch((err) => {
          setLoader(false);
          toast.error(err.message, {
            autoClose: 1500,
          });
        });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="container-lg">
      <div className="authentication-wrapper authentication-basic py-3">
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
                  <CustomInput
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
                  <CustomInput
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
                  <CustomInput
                    type="password"
                    placeholder="············"
                    value={password.value}
                    isError={password.isError}
                    messageError={password.messageError}
                    onChange={passwordHanlder}
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <Label>Confirm Password</Label>
                  <CustomInput
                    type="password"
                    placeholder="············"
                    value={confirmPassword.value}
                    isError={confirmPassword.isError}
                    messageError={confirmPassword.messageError}
                    onChange={confirmPasswordHanlder}
                    autoComplete="off"
                  />
                </div>
                <Button
                  color="primary"
                  className={loader ? "btn-disabled w-100" : "w-100"}
                  type="submit"
                >
                  {loader ? <Spinner size="sm" /> : "Sign up"}
                </Button>
              </Form>
              <p className="text-center">
                <span className="me-1">Already have an account?</span>
                <Link to="/login" replace>
                  Sign in instead
                </Link>
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
