import { formatTransactionType } from "../../lib/helper";

const categoryColumns = [
  { title: "Name", key: "name" },
  { title: "Type", key: "category", function: formatTransactionType},
  { title: "Actions", key: "action" },
];

export default categoryColumns;
