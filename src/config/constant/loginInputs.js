const loginInputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "email",
    autoComplete: "email",
  },
  {
    id: "2",
    label: "password",
    type: "password",
    name: "password",
    placeholder:"Enter your password",
    autoComplete: "current-password",
    pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}",
    errorMessage:
      "Password character > 6, include alphanumeric, and special character",
  },
];

export default loginInputs;
