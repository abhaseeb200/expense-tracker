import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Form, Row, Spinner } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import signUpInputs from "../../config/constant/signUpInputs";
import { Input } from "../../components/input";
import logo from "../../assets/logo.svg";
import "./style.css";

const SignUp = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const confirmPasswordRef = useRef(null);

  const { loading } = useAuth();

  let pwd = document.getElementsByName("confirm_password");

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    if (!e.target.value?.trim()) {
      setErrors({ ...errors, [e.target.name]: true });
    } else {
      setErrors({ ...errors, [e.target.name]: false });
    }

    // CONFIRM PASSWORD VALIDATION
    if (e.target.name === "confirm_password") {
      if (e.target.value !== values.password) {
        pwd[0].setCustomValidity("Password Must be Matching.");
      } else {
        pwd[0].setCustomValidity("");
      }
    }
    if (e.target.name === "password") {
      if (e.target.value !== values.confirm_password) {
        pwd[0].setCustomValidity("Password Must be Matching.");
      } else {
        pwd[0].setCustomValidity("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    let error = {};
    let formData = new FormData(e.target);

    formData.forEach((value, key) => {
      data[key] = value;
      if (!value?.trim()) {
        error[key] = true;
      }
    });

    setErrors(error);

    //SUBMIT THE FORM BY USING 'DATA'
    if (!Object.values(error).includes(true)) {
    }
  };
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
              <Form
                className="mb-3 d-flex flex-column gap-3"
                onSubmit={handleSubmit}
              >
                {signUpInputs?.map((input) => {
                  return (
                    <Input
                      {...input}
                      key={input?.id}
                      value={values[input.name] || ""}
                      errors={errors[input.name] || ""}
                      ref={confirmPasswordRef}
                      onChange={handleOnChange}
                    />
                  );
                })}
                <Button
                  color="primary"
                  className={loading ? "btn-disabled w-100" : "w-100"}
                  type="submit"
                >
                  {loading ? <Spinner size="sm" /> : "Sign up"}
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

export default SignUp;
