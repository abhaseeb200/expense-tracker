import formatDate from "./formatDate";

const transitionColumns = [
  { title: "Name", key: "name", objectKey: "docData" },
  { title: "Category", key: "category", objectKey: "docData" },
  { title: "Date", key: "date", objectKey: "docData", function: formatDate },
  { title: "Amount", key: "amount", objectKey: "docData" },
  { title: "Type", key: "type", objectKey: "docData" },
  { title: "Action", key: "action" },
];

export default transitionColumns;
