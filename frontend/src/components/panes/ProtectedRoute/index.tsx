import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../../../app/store";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};
