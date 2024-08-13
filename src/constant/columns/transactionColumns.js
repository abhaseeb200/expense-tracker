import {
  formatAmount,
  formatCategory,
  formatDate,
  formatSource,
  formatTransactionType,
} from "../../lib/helper";

const transactionColumns = [
  { title: "Name", key: "name" },
  { title: "Category", key: "category", function: formatCategory },
  { title: "Date", key: "date", function: formatDate },
  { title: "Amount", key: "amount", function: formatAmount },
  { title: "Type", key: "type", function: formatTransactionType },
  { title: "Source", key: "source", function: formatSource },
  { title: "Actions", key: "action" },
];

export default transactionColumns;
