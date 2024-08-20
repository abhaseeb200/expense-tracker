const accountSettingInputs = [
  {
    id: 1,
    name: "fname",
    type: "text",
    placeholder: "John",
    label: "First Name",
  },
  {
    id: 2,
    name: "lname",
    type: "text",
    placeholder: "Doe",
    label: "Last Name",
  },
  {
    id: 3,
    name: "email",
    type: "email",
    label: "email",
    placeholder: "Enter your email",
  },
  {
    id: 4,
    name: "username",
    type: "text",
    placeholder: "Enter your username",
    label: "username",
    pattern: "^[a-z0-9]{4,}$",
    errorMessage: "Username length > 3, including lowercase, without space",
  },
  {
    id: 5,
    name: "phone",
    type: "number",
    placeholder: "Enter your phone number",
    label: "Phone Number",
  },
  {
    id: 6,
    name: "address",
    type: "text",
    placeholder: "Enter your address",
    label: "Address",
  },
];

export default accountSettingInputs;
