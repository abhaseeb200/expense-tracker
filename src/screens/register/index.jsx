import { Container } from "reactstrap";
import CustForm from "../../components/authForm";

const Register = () => {
  return (
    <Container>
      <CustForm
        heading="Adventure starts here 🚀"
        text="Join us and embark on an exciting journey!"
        bottomText="Already have an account?"
        linkText = "Sign in instead"
      />
    </Container>
  );
};

export default Register;
