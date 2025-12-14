import { Navigate } from "react-router-dom";
import { secureStorage } from "../utils/secureStorage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = secureStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
