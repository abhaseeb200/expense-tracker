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
    className: "order-3",
  },
  {
    id: 3,
    name: "amount",
    type: "number",
    placeholder: "200...",
    label: "amount",
    required: true,
    min: 1,
    pattern: "/^[1-9]d*$/",
    errorMessage: "Amount must be greater than 01",
    className: "order-last",
  },
];

const transactionSelects = [
  {
    id: 1,
    name: "type",
    placeholder: "Select Transaction",
    label: "Transaction Type",
    className: "order-1",
    options: [
      { value: "expense", name: "Expense" },
      { value: "income", name: "Income" },
    ],
  },
  {
    id: 2,
    name: "category",
    placeholder: "Select Category",
    label: "Select Category",
    className: "order-2",
    options: [{ value: "", name: "Select Category" }],
  },
];

export { transactionInputs, transactionSelects };
