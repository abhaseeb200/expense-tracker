import { useSelector } from "react-redux";

const RouteLink = ({ icon, name, isActive }) => {
  const { isDarkMode } = useSelector((state) => state?.themeMode);

  return (
    <>
      <box-icon
        size="sm"
        name={icon}
        color={isActive ? "#696cff" : isDarkMode ? "#fff" : "#697a8d"}
        style={{ width: "19px" }}
      ></box-icon>
      <div className="ms-2">{name}</div>
    </>
  );
};

export default RouteLink;
