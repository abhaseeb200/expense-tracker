import { useSelector } from "react-redux";

const formatTransactionType = (value, key) => {
  return (
    <span
      className={`${
        value[key].toLowerCase() === "expense"
          ? "border-danger"
          : "border-success"
      } badge rounded-pill border w-100 max-w-160px`}
    >
      {value[key]}
    </span>
  );
};

const formatAmount = (amount, key) => {
  const formatter = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount[key]);
};

const formatDate = (dateString, key) => {
  const date = new Date(dateString[key]);
  const formatter = new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formatter.format(date);
};

const renderTitleWithImage = (url, key) => {
  return (
    <div
      className="d-flex gap-2 align-items-center"
      style={{ width: "40px", height: "40px" }}
    >
      <img
        src={url?.sourceURL}
        alt="source-image"
        className="w-100 h-100 object-fit-cover"
      />
      <span>{url[key]}</span>
    </div>
  );
};

const formatCategory = (data, key, referenceData) => {
  return referenceData[data?.categoryId]?.name || data[key];
};

export {
  formatTransactionType,
  formatAmount,
  formatDate,
  renderTitleWithImage,
  formatCategory,
};
