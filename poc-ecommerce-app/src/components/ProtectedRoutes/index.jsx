import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ roles, children }) => {
  const { role: userRole } = useSelector((state) => state.auth);

  return roles.includes(userRole) ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
