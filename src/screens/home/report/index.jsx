import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Label,
  Table,
} from "reactstrap";
import SideNavbar from "../../../components/sideNavbar";
import CustNavbar from "../../../components/navbar";
import { useState } from "react";
import CustomInput from "../../../components/input";
import TransactionCategoryModal from "../modal";

const Report = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [modal, setModal] = useState(false);

  const [date, setDate] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  const toggle = () => setModal(!modal);

  const dateHandler = (e) => {
    if (e.target.value === "") {
      setDate({
        value: e.target.value,
        isError: true,
        messageError: "Please select date",
      });
    } else {
      setDate({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  return (
    <div className="container-lg">
      <SideNavbar
        sideBarToggle={sideBarToggle}
        setSideBarToggle={setSideBarToggle}
        toggle={toggle}
      />
      <div className="layout-page">
        <CustNavbar setSideBarToggle={setSideBarToggle} />
        <h5 className="fw-bold py-3 my-3">Report Generate</h5>
        <Card className="">
          <CardBody className="pb-2">
            <CardTitle>Filter By Date</CardTitle>
          </CardBody>
          <CardBody className="pt-3 row align-items-end">
            <div className="col-md-4">
              <Label>Start date</Label>
              <CustomInput
                type="date"
                placeholder=""
                onChange={dateHandler}
                value={date.value}
                isError={date.isError}
                messageError={date.messageError}
              />
            </div>
            <div className="col-md-4">
              <Label>End date</Label>
              <CustomInput
                type="date"
                placeholder=""
                onChange={dateHandler}
                value={date.value}
                isError={date.isError}
                messageError={date.messageError}
              />
            </div>
            <div className="col-md-2">
              <Button color="primary" className="w-100">
                Filter
              </Button>
            </div>
            <div className="col-md-2">
              <Button color="secondary" outline className="w-100">
                Clear
              </Button>
            </div>
            <CardText className="mt-5">
              Transaction Reports Based On Categories
            </CardText>
            <div>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>Otto</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <td className="fw-bold" colSpan="5">
                      <div className="d-flex justify-content-between">
                        <span>Total Expenses</span>
                        <span>0</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold" colSpan="5">
                      <div className="d-flex justify-content-between">
                        <span>Total Income</span>
                        <span>0</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </div>
      <TransactionCategoryModal modal={modal} toggle={toggle} />
    </div>
  );
};

export default Report;
