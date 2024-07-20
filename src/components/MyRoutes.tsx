import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sistema } from "./Sistema";
import { useAuth } from "../contexts/auth/AuthProvider";
import { Redirecionamento } from "./Redirecionamento";
import React, { Suspense } from "react";
import ComponentOffLine from "./ComponentOffLine";

//Load lazy module fundation
/*const Login = React.lazy(
  async () =>
    await import("sso/Sso").catch(() => {
      return { default: () => <ComponentOffLine /> };
    })
);*/

const MyRoutes = () => {
  const auth = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {auth?.validado ? (
          <Route path="/" element={<Sistema />} />
        ) : (
          <Route path="/" element={<Redirecionamento />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
