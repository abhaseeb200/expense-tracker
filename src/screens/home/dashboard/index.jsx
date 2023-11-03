import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Container,
} from "reactstrap";
import "../style.css";
import SideNavbar from "../../../components/sideNavbar";
import CustNavbar from "../../../components/navbar";

const Dashboard = () => {
  return (
    <Container>
      <SideNavbar />
      <div className="layout-page">
        <CustNavbar />
        <Card className="mt-4">
          <CardBody className="pb-0">
            <CardTitle>Transaction Comparison Between Months</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>
        <Card className="mt-4">
          <CardBody className="pb-0">
            <CardTitle>Budget & Expense Comparison Between Months</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default Dashboard;
