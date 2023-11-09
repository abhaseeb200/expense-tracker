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
import { useEffect, useState } from "react";
import CustomInput from "../../../components/input";
import TransactionCategoryModal from "../modal";
import { getTransaction } from "../../../config/service/firebase/transaction";

const Report = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [transactionData, setTransactionData] = useState({});

  const [startDate, setStartDate] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [endDate, setEndDate] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  useEffect(() => {
    getTransactionDataHandler();
  }, []);

  const startDateHandler = (e) => {
    if (e.target.value === "") {
      setStartDate({
        value: e.target.value,
        isError: true,
        messageError: "Please select date",
      });
    } else {
      setStartDate({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const endDateHandler = (e) => {
    if (e.target.value === "") {
      setEndDate({
        value: e.target.value,
        isError: true,
        messageError: "Please select date",
      });
    } else {
      setEndDate({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const toggle = () => setModal(!modal);

  const getTransactionDataHandler = () => {
    let tempReportData = {};
    getTransaction().then((res) => {
      res.forEach((element) => {
        if (!tempReportData[element.data().category]) {
          tempReportData[element.data().category] = [];
        }
        tempReportData[element.data().category].push(element.data());
      });
      setTransactionData(tempReportData);
    });
  };

  const filterData = () => {
    console.log(startDate.value,endDate.value);
    if (new Date(startDate.value) <= new Date(endDate.value)) {
      
    } else {
      console.log("invalid data...");
    }
  }

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
                onChange={startDateHandler}
                value={startDate.value}
                isError={startDate.isError}
                messageError={startDate.messageError}
              />
            </div>
            <div className="col-md-4">
              <Label>End date</Label>
              <CustomInput
                type="date"
                placeholder=""
                onChange={endDateHandler}
                value={endDate.value}
                isError={endDate.isError}
                messageError={endDate.messageError}
              />
            </div>
            <div className="col-md-2">
              <Button color="primary" className="w-100" onClick={filterData}>
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
                  {Object.keys(transactionData).map((category, ind) => {
                    let categoryItems = transactionData[category];
                    return (
                      <tr key={ind}>
                        <td>{category}</td>
                        <td>
                          {categoryItems.map((item) => (
                            <span className="d-block">{item.name}</span>
                          ))}
                        </td>
                        <td>
                          {categoryItems.map((item) => (
                            <span
                              className={
                                item.type === "expense"
                                  ? "badge bg-danger mb-2 d-block"
                                  : "badge bg-success mb-2 d-block"
                              }
                            >
                              {item.type}
                            </span>
                          ))}
                        </td>
                        <td>
                          {categoryItems.map((item) => (
                            <span className="d-block">{item.category}</span>
                          ))}
                        </td>
                        <td>
                          {categoryItems.map((item) => (
                            <span className="d-block">{item.date}</span>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
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
