import { formatDate, renderTitleWithImage } from "../../lib/helper";

const sourceColumns = [
  { title: "Ttile", key: "name", function: renderTitleWithImage },
  { title: "Description", key: "description" },
  { title: "Date", key: "date", function: formatDate },
  { title: "Actions", key: "action" },
];

export default sourceColumns;
