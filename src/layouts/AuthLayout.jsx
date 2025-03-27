import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const authRoutes = ["/"];

  return (
    <>
      {authRoutes.includes(pathName) ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <main>
              <Outlet />
          </main>
        </>
      )}
    </>
  );
};

export default AuthLayout;
