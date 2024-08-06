import { formatDate } from "./helper";

const transactionColumns = [
  { title: "Image", key: "url" },
  { title: "Title", key: "title" },
  { title: "Description", key: "description" },
  { title: "Date", key: "date", function: formatDate },
  { title: "Actions", key: "action" },
];

export default transactionColumns;
