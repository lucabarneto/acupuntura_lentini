import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const authenticated = localStorage.getItem("authenticated");

  if (!authenticated || authenticated === "false") {
    return <Navigate to="/login" />;
  }

  return children;
};
