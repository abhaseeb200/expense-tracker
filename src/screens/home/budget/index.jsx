import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
} from "reactstrap";
import SideNavbar from "../../../components/sideNavbar";
import CustNavbar from "../../../components/navbar";

const Budget = () => {
  return (
    <Container>
      <SideNavbar />
      <div className="layout-page">
        <CustNavbar />
        <Card className="mt-4">
          <CardBody className="pb-0">
            <CardTitle>Add Budget</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>
        <Card className="mt-4">
          <CardBody className="pb-0">
            <CardTitle>Budget Data</CardTitle>
          </CardBody>
          <CardBody className="pt-0">
            <CardText className="no-data">No Data found</CardText>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default Budget;
