import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Row, Button, Form, Spinner } from "reactstrap";
import Input from "../../components/Input";
import { EyeIcon, EyeOffIcon } from "../../components/Icons";
import loginInputs from "../../constant/inputs/loginInputs";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo.svg";

const Login = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isVisible, setVisible] = useState(false);

  const { useSignIn, loading } = useAuth();

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    if (!e.target.value?.trim()) {
      setErrors({ ...errors, [e.target.name]: true });
    } else {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleVisible = () => {
    setVisible((prev) => !prev);
  };

  console.log("ENV :" ,process.env.REACT_APP_GREETING)

  const getInputType = (inputName, isVisible) => {
    switch (inputName) {
      case "password":
        return isVisible ? "text" : "password";
      default:
        return null;
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
      await useSignIn(data?.email, data?.password);
    }
  };

  return (
    <Card>
      <CardBody>
        <Row className="logo-row">
          <span className="app-brand-text">
            <img src={logo} width="45px" /> xpensr
          </span>
        </Row>
        <h4 className="mb-2">Adventure starts here 🚀</h4>
        <p className="mb-4">Join us and embark on an exciting journey!</p>

        <Form className="mb-3 flex-column d-flex gap-3" onSubmit={handleSubmit}>
          {loginInputs?.map((input) => {
            return (
              <Input
                {...input}
                key={input?.id}
                value={values[input.name] || ""}
                errors={errors[input.name] || ""}
                onChange={handleOnChange}
                type={getInputType(input?.name, isVisible)}
                icon={
                  isVisible ? (
                    <EyeIcon fill="#afb4b9" onClick={handleVisible} />
                  ) : (
                    <EyeOffIcon fill="#afb4b9" onClick={handleVisible} />
                  )
                }
              />
            );
          })}
          <Button
            color="primary"
            className="w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Sign in"}
          </Button>
        </Form>

        <div className="text-center">
          <span className="me-1">New on our platform?</span>
          <Link to="/register" replace>
            Create an account
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default Login;
