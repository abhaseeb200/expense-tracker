const transactionInputs = [
  {
    id: 1,
    name: "name",
    type: "text",
    placeholder: "Bills.",
    label: "name",
    className: "order-first",
  },
  {
    id: 2,
    name: "date",
    type: "date",
    label: "date",
    max: new Date().toISOString().split("T")[0],
    className: "order-4",
  },
  {
    id: 3,
    name: "amount",
    type: "number",
    placeholder: "200...",
    label: "amount",
    min: 1,
    pattern: "/^[1-9]d*$/",
    errorMessage: "Amount must be greater than 01",
    className: "order-last",
  },
  {
    id: 4,
    name: "categoryId",
    type: "hidden",
    className: "d-none",
  },
  {
    id: 5,
    name: "sourceId",
    type: "hidden",
    className: "d-none",
  },
];

export default transactionInputs;
