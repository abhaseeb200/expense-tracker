import { formatDate } from "../helper";

const sourceColumns = [
  { title: "Image", key: "url" },
  { title: "Title", key: "title" },
  { title: "Description", key: "description" },
  { title: "Date", key: "date", function: formatDate },
  { title: "Actions", key: "action" },
];

export default sourceColumns;
