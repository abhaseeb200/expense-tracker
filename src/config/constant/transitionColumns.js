import formatDate from "./formatDate";

const transitionColumns = [
  { title: "Name", key: "name" },
  { title: "Category", key: "category" },
  { title: "Date", key: "date", function: formatDate },
  { title: "Amount", key: "amount" },
  { title: "Type", key: "type" },
  { title: "Actions", key: "action" },
];

export default transitionColumns;
