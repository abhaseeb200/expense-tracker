import { formatDate } from "../helper";

const budgetColumns = [
  { title: "Name", key: "name" },
  { title: "Amount", key: "amount" },
  { title: "Date", key: "date", function: formatDate },
  { title: "Actions", key: "action" },
];

export default budgetColumns;
