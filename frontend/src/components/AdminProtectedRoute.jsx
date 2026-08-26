import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute() {
  const storedUser = JSON.parse(localStorage.getItem("userInfo"));
  if (storedUser && storedUser.role === "admin") {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
}
