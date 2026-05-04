import { Navigate } from "react-router-dom";
import { getStoredUser } from "../utils/axiosconfig";

export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = getStoredUser();
  return getTokenFromLocalStorage?.token !== undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
};
