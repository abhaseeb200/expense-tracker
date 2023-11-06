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
import { useState } from "react";

const Dashboard = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);

  return (
    <div className="container-lg">
      <SideNavbar
        sideBarToggle={sideBarToggle}
        setSideBarToggle={setSideBarToggle}
      />
      <div className="layout-page">
        <CustNavbar setSideBarToggle={setSideBarToggle} />
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
    </div>
  );
};

export default Dashboard;
