import React from "react";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import { AuthProvider, useAuth } from "./contexts/auth/AuthProvider";
import MyRoutes from "./components/MyRoutes";
import ReactDOM from "react-dom/client";

import "./index.css";

const App = () => {
  const auth = useAuth();

  console.log("Usuario validado: ", auth?.validado);

  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        token: {
          colorPrimary: "#DAA520",
          borderRadius: 6,
        },
      }}
    >
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
    </ConfigProvider>
  );
};
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
