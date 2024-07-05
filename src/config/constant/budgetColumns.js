import formatDate from "./formatDate";

const budgetColumns = [
  { title: "Name", key: "name" },
  { title: "Amount", key: "amount" },
  { title: "Date", key: "date", function: formatDate },
  { title: "Action", key: "action" },
];

export default budgetColumns;
