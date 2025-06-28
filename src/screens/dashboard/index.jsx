import { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Spinner,
} from "reactstrap";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import "../style.css";
import {
  DollarIcon,
  SaveMoneyIcon,
  TransferIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "../../components/Icons";
import LineChart from "../../components/LineChart";
import DonutChart from "../../components/DonutChart";
import BarChart from "../../components/BarChart";
import useDashboard from "../../hooks/useDashboard";
import { formatDate } from "../../lib/helper";

Chart.register(CategoryScale);

const Dashboard = () => {
  const { userId } = useSelector((state) => state?.auth?.userData);

  const {
    expenseAmount,
    incomeAmount,
    topExpenseData,
    recentExpenses,
    monthlyOverview,
    loading,
    getTopExpenses,
    getExpenseAmount,
    getIncomeAmount,
    getMonthlyOverview,
    getRecentExpenses,
  } = useDashboard(userId);

  useEffect(() => {
    if (!userId) return;
    getMonthlyOverview();
    getExpenseAmount();
    getIncomeAmount();
    getTopExpenses();
    getRecentExpenses();
  }, [userId]);

  return (
    <>
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}
        className="d-grid mt-3"
      >
        <Card>
          <CardBody>
            <DollarIcon className="icon-with-bg" fill="#696cff" />
            <small className="text-uppercase ">Total Income</small>
            <h4 className="fw-semibold mt-1">Rs {incomeAmount}</h4>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <TransferIcon className="icon-with-bg" fill="#696cff" />
            <small className="text-uppercase">Total Expense</small>
            <h4 className="fw-semibold">Rs {expenseAmount}</h4>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <SaveMoneyIcon className="icon-with-bg" fill="#696cff" />
            <small className="text-uppercase ">Total Saving</small>
            <h4 className="fw-semibold">
              Rs {Math.max(incomeAmount - expenseAmount, 0)}
            </h4>
          </CardBody>
        </Card>
      </div>

      <div className="d-flex gap-3 flex-lg-nowrap flex-wrap my-3">
        <Card className="w-62">
          <CardBody className="">
            <CardTitle className="text-uppercase mb-3">
              Monthly Overview
            </CardTitle>
            <BarChart chartData={monthlyOverview} loading={loading} />
          </CardBody>
        </Card>

        <Card className="w-38">
          <CardBody>
            <CardTitle className="text-uppercase mb-3">Top Expenses</CardTitle>

            {loading ? (
              <div style={{height:'367px'}} className="d-flex justify-content-center align-items-center">
                <Spinner />
              </div>
            ) : topExpenseData?.length ? (
              <div className="d-flex flex-column gap-2">
                {topExpenseData.map((expense, index) => (
                  <div key={index} className="recent-expenses">
                    <div className="d-flex justify-content-between">
                      <h6 className="m-0">{expense?.name}</h6>
                      <h6 className="m-0">Rs {expense?.amount}</h6>
                    </div>
                    <span>{formatDate(expense?.date, "_", false)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No expenses found.</p>
            )}

          </CardBody>
        </Card>
      </div>

      <div className="d-flex gap-3 flex-md-nowrap flex-wrap mb-3">
        <Card className="w-37">
          <CardBody className="">
            <CardTitle className="text-uppercase mb-4">
              Report Overview
            </CardTitle>
            <div className="d-flex">
              <DonutChart
                income={incomeAmount}
                expense={expenseAmount}
                saving={Math.max(incomeAmount - expenseAmount, 0)}
                loading={loading}
              />
            </div>
          </CardBody>
        </Card>

        <Card className="w-63">
          <CardBody className="">
            <CardTitle className="mb-4 text-uppercase">
              Recent Expenses Activity
            </CardTitle>
            <LineChart chartData={recentExpenses} loading={loading} />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
