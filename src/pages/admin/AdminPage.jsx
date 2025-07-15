import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminPage = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/auth/login" />;

  if (role !== "admin") return <Navigate to="/" />;
  return children;
};

AdminPage.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AdminPage;
