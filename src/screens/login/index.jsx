import { Card, CardBody, Row, Button, Form, Label, Spinner } from "reactstrap";
import "./style.css";
import logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import CustomInput from "../../components/input";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { authSignIn } from "../../config/service/firebase/auth";
import { auth } from "../../config/firebaseConfig";

const Login = ({user}) => {
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
  
  useEffect(() => {
      if (user) {
        navigate("/",{replace:true})
      }
  }, []);

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
      return
    }

    //check validation
    if (!email.isError && !password.isError) {
      setLoader(true)
      authSignIn(email.value,password.value)
      .then((res)=> {
        setLoader(false)
        let user = auth.currentUser
        localStorage.setItem("currentUser",user.uid)
        navigate("/" ,{ replace: true })
      }).catch((err)=>{
        console.log(err);
        setLoader(false)
      })
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
                />
              </div>
              <Button color="primary" className={loader?"btn-disabled w-100":"w-100"} type="submit">
                {loader ? <Spinner size="sm"></Spinner> : "Sign in"}
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
  );
};

export default Login;
