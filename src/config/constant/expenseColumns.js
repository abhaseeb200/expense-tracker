import { formatAmount, formatDate, formatTransactionType } from "./helper";

const expenseColumns = [
  { title: "Name", key: "name" },
  { title: "Category", key: "category" },
  { title: "Date", key: "date", function: formatDate },
  { title: "Amount", key: "amount", function: formatAmount },
  { title: "Type", key: "type", function: formatTransactionType },
  { title: "Actions", key: "action" },
];

export default expenseColumns;
