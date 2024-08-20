const transactionDropdown = [
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
  {
    id: 3,
    name: "source",
    placeholder: "Select Source",
    label: "Select Source",
    className: "order-3",
    options: [{ value: "", name: "Select Source" }],
  },
];

export default transactionDropdown;
