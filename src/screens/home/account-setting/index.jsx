import { Card, CardBody, CardText, CardTitle, Container, Navbar } from "reactstrap";
import SideNavbar from "../../../components/sideNavbar";
import CustNavbar from "../../../components/navbar";

const Account = () => {
  return (
    <Container>
      <SideNavbar />
      <div className="layout-page">
        <CustNavbar />
        <Card className="mt-4">
          <CardBody className="pb-0">
            <CardTitle>Profile Details</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default Account;
