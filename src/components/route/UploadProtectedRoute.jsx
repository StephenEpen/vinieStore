import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UploadProtectedRoute = ({ children }) => {
  const { currentUser, verifAdminUID } = useAuth();

  if (!currentUser || !verifAdminUID()) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default UploadProtectedRoute;
