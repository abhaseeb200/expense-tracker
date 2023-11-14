const RouteLink = ({ icon, name,isActive }) => {
  return (
    <>
      <box-icon
        size="sm"
        name={icon}
        color={isActive ? "#696cff" : "#697a8d "}
        style={{ width: "19px" }}
      ></box-icon>
      <div className="ms-2">{name}</div>
    </>
  );
};

export default RouteLink;
