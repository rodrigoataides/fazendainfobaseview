import React from "react";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import { AuthProvider, useAuth } from "./contexts/auth/AuthProvider";
import MyRoutes from "./components/MyRoutes";
import ReactDOM from "react-dom/client";

import "./index.css";

const App = () => {
  const auth = useAuth();

  const host = window.location.host === "localhost:8181" ? `http://${window.location.host}` : `https://${window.location.host}`;

  return (
    <div style={{ height: "100vh", backgroundImage: `url('${host}/img/background_app.png')`, backgroundPosition: "center", backgroundSize: "cover" }}>
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
    </div>
  );
};
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
