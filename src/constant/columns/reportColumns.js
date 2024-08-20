import { formatAmount, formatDate, formatSource, formatTransactionType } from "../../lib/helper";

const reportColumns = [
  { title: "Name", key: "name" },
  { title: "Category", key: "category" },
  { title: "Date", key: "date", function: formatDate },
  { title: "Type", key: "type", function: formatTransactionType },
  { title: "Source", key: "sourceId", function: formatSource },
  { title: "Amount", key: "amount", function: formatAmount },
  { title: "", key: "" },
];

export default reportColumns;
