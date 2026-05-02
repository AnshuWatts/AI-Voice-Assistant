import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const authed = typeof window !== "undefined" && sessionStorage.getItem("natasha:auth") === "1";
  if (!authed) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }
  return children;
}
