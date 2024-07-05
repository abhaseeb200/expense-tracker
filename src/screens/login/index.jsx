import { Card, CardBody, Row, Button, Form, Label, Spinner } from "reactstrap";
import "./style.css";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import {CustomInput} from "../../components/input";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { authSignIn } from "../../config/service/firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../feature/auth/userSlice";

const Login = ({ user,setUser }) => {
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
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const emailHanlder = (e) => {
    let emailVal = e.target.value.trim()
    if (emailVal === "") {
      setEmail({
        value: emailVal,
        isError: true,
        messageError: "Please enter your email address.",
      });
    } else if (
      !emailVal
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
    let passwordVal = e.target.value
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
  };

  const signUpHandler = (e) => {
    e.preventDefault();
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

    if (email.value === "" || password.value === "") {
      return;
    }

    //check validation
    if (!email.isError && !password.isError) {
      let userData = {}
      setLoader(true);
      authSignIn(email.value, password.value)
        .then(() => {
          setLoader(false);
          let user = auth.currentUser;
          userData = {
            userId: user.uid,
          }
          dispatch(getUserProfile(userData))
          localStorage.setItem("currentUser", user.uid);
          setUser(user.uid)
          navigate("/", { replace: true });
          toast.success("Login successfully!",{
            autoClose: 1500,
          });
        })
        .catch((err) => {
          toast.error(err.message,{
            autoClose: 1500,
          });
          setLoader(false);
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
                  autoComplete = "off"
                />
              </div>
              <Button
                color="primary"
                className={loader ? "btn-disabled w-100" : "w-100"}
                type="submit"
              >
                {loader ? <Spinner size="sm"/> : "Sign in"}
              </Button>
            </Form>
            <p className="text-center">
              <span className="me-1">New on our platform?</span>
              <Link to="/register" replace>
                Create an account
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
   </div>
  );
};

export default Login;
