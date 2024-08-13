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
    <div className="d-flex gap-2 align-items-center">
      <img
        src={url?.sourceURL}
        alt="source-image"
        className="object-fit-cover"
        style={{ width: "40px", height: "40px" }}
      />
      <span>{url[key]}</span>
    </div>
  );
};

const formatCategory = (data, key, categoryDate) => {
  return categoryDate[data?.categoryId]?.name || data[key];
};

const formatSource = (data, key, sourceData) => {
  return sourceData[data?.sourceId]?.name;
};

export {
  formatTransactionType,
  formatAmount,
  formatDate,
  renderTitleWithImage,
  formatCategory,
  formatSource,
};
