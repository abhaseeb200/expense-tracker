const expenseInputs = [
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
    className: "order-3",
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
];

export default expenseInputs;
