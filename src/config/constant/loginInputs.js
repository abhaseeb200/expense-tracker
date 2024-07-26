const loginInputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "email",
    pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$",
    errorMessage: "Invalid email format",
  },
  {
    id: 2,
    name: "password",
    type: "text",
    label: "password",
    placeholder: "Enter your password",
    // pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$",
    // errorMessage:
    //   "Password must be > 6 chars, with alphanumeric, and special chars.",
  },
];

export default loginInputs;
