const navbarData = [
  {
    id: 1,
    to: "/",
    title: "Dashboards",
    icon: "home-circle",
    isActive: true,
    className: "menu-link nav-link",
    isLine: false,
  },
  {
    id: 2,
    isLine: true,
    title: "Bank / Source",
    className: "menu-header small text-uppercase",
  },
  {
    id: 3,
    to: "/transaction",
    title: "Transaction",
    icon: "book-add",
    isActive: false,
    className: "menu-link nav-link",
    isLine: false,
  },
  {
    id: 22,
    isLine: true,
    title: "Expense",
    className: "menu-header small text-uppercase",
  },
  {
    id: 33,
    to: "/expense",
    title: "Expense",
    icon: "book-add",
    isActive: false,
    className: "menu-link nav-link",
    isLine: false,
  },
  {
    id: 4,
    to: "/category",
    title: "Category",
    icon: "category",
    isActive: false,
    className: "menu-link nav-link",
    isLine: false,
  },
  {
    id: 5,
    isLine: true,
    title: "Budget",
    className: "menu-header small text-uppercase",
  },
  {
    id: 6,
    to: "/budget",
    title: "Budget",
    icon: "book-add",
    isActive: false,
    className: "menu-link nav-link",
    isLine: false,
  },
  {
    id: 7,
    isLine: true,
    title: "Visualization",
    className: "menu-header small text-uppercase",
  },
  {
    id: 8,
    to: "/report",
    title: "Report Generation",
    icon: "dock-top",
    isActive: false,
    className: "menu-link nav-link",
    isLine: false,
  },
  {
    id: 9,
    isLine: true,
    title: "Profile",
    className: "menu-header small text-uppercase",
  },
  {
    id: 10,
    to: "/account",
    title: "Account Settings",
    icon: "lock-open-alt",
    isActive: false,
    className: "menu-link nav-link",
    isLine: false,
  },
];

export default navbarData;
