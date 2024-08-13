const sourceInputs = [
  {
    id: 1,
    name: "name",
    type: "text",
    placeholder: "Bills.",
    label: "name",
  },
  {
    id: 3,
    name: "description",
    type: "text",
    placeholder: "Description...",
    label: "description",
  },
  {
    id: 2,
    name: "date",
    type: "date",
    label: "date",
    max: new Date().toISOString().split("T")[0],
  },
];

export default sourceInputs;
