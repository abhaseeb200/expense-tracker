const signUpInputs = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Enter your username",
    label: "username",
    pattern: "^[a-z0-9]{4,}$",
    errorMessage: "Username length > 3, including lowercase, without space",
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "email",
    autoComplete: "email",
  },
  {
    id: 3,
    label: "password",
    type: "text",
    name: "password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
    pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[!@#$%^&*]).{8,}",
    errorMessage:
      "Password length > 6, include alphanumeric, and special character",
  },
  {
    id: 4,
    label: "confirm password",
    type: "text",
    name: "confirm_password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
    errorMessage: "Passwords do not match.",
  },
];

export default signUpInputs;
