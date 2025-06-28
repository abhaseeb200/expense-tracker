import { store } from "../../config/store";

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

const formatDate = (dateString, key, isTable = true) => {
  let date;
  if (isTable) {
    date = new Date(dateString[key]?.seconds * 1000 || dateString[key]);
  } else {
    date = new Date(dateString?.seconds * 1000);
  }

  const formatter = new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formatter.format(date);
};

const renderTitleWithImage = (url, key, handleOpenImage) => {
  return (
    <div
      className="d-flex gap-2 align-items-center cursor-pointer image-with-title-hover"
      onClick={() => handleOpenImage(url?.sourceURL)}
    >
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

const formatCategory = (data, key) => {
  const { categoryData } = store.getState().category;
  return categoryData[data?.categoryId]?.name || data[key];
};

const formatSource = (data, _, handleOpenImage) => {
  const { sourceData } = store.getState().source;

  return (
    <div
      onClick={() => handleOpenImage(sourceData[data?.sourceId]?.sourceURL)}
      className="cursor-pointer image-with-title-hover"
    >
      <span>{sourceData[data?.sourceId]?.name}</span>
    </div>
  );
};

export {
  formatTransactionType,
  formatAmount,
  formatDate,
  renderTitleWithImage,
  formatCategory,
  formatSource,
};
