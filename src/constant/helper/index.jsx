const formatTransactionType = (value) => {
  return (
    <span
      className={`${
        value.toLowerCase() === "expense" ? "border-danger" : "border-success"
      } badge rounded-pill border w-100 max-w-160px`}
    >
      {value}
    </span>
  );
};

const formatAmount = (amount) => {
  const formatter = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formatter.format(date);
};

export { formatTransactionType, formatAmount, formatDate };
