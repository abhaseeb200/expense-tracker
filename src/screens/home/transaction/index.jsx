import { Card, CardBody, CardText, CardTitle, Container, Navbar } from "reactstrap";
import SideNavbar from "../../../components/sideNavbar";
import CustNavbar from "../../../components/navbar";

const Transaction = () => {
  return (
    <Container>
      <SideNavbar />
      <div className="layout-page">
        <CustNavbar />
        <Card className="mt-4">
          <CardBody className="pb-0">
            <CardTitle>Add Transaction</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>
        <Card className="mt-4">
          <CardBody className="pb-0">
            <CardTitle>Transaction Data</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default Transaction;
