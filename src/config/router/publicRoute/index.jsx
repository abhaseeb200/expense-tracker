import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import './style.css'

const PublicRoute = () => {
  const { isLogin } = useSelector((state) => state.auth);

  if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container-lg">
      <div className="authentication-wrapper authentication-basic py-3">
        <div className="authentication-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PublicRoute;
