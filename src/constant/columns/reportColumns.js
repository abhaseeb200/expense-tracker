import { formatAmount, formatDate, formatTransactionType } from "../../lib/helper";

const reportColumns = [
  { title: "Name", key: "name" },
  { title: "Category", key: "category" },
  { title: "Date", key: "date", function: formatDate },
  { title: "Type", key: "type", function: formatTransactionType },
  { title: "Amount", key: "amount", function: formatAmount },
  { title: "", key: "" },
];

export default reportColumns;
