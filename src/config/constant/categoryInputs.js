const categoryInputs = [
  {
    id: 1,
    name: "name",
    type: "text",
    placeholder: "Bills.",
    label: "name",
  },
];

const categorySelects = [
  {
    id: 2,
    name: "category",
    type: "select",
    label: "Transaction Type",
    options: [
      { value: "", name: "Select Transaction" },
      { value: "expense", name: "Expense" },
      { value: "income", name: "Income" },
    ],
  },
];

export { categoryInputs, categorySelects };
