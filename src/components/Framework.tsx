import React from "react";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import { AuthProvider, useAuth } from "../contexts/auth/AuthProvider";
import MyRoutes from "./MyRoutes";

type Props = {
  nomeSis: string | null;
  descricaoSis: string | null;
  menus: Menu[];
  breadcrumb: any;
  children: JSX.Element | null;
  onChangeMenu: (itemMenuSelecionado: any | null) => void;
};

type Menu = {
  label: string;
  key: string;
  icon: JSX.Element;
  link: string;
  perfis: [];
  children: [];
};

export const Framework = ({
  nomeSis,
  descricaoSis,
  menus,
  breadcrumb,
  children,
  onChangeMenu,
}: Props) => {
  const auth = useAuth();
  /*auth?.setVariaveisSis({
    nomeSis: nomeSis,
    descricaoSis: descricaoSis,
    menus: menus,
    children: children,
  });*/

  const menuSelecionado = (itemSelecionado: any) => {};

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
        {/*<Routes>
              <Route path='/*' element={<Sistema />} />
              </Routes>*/}
        <MyRoutes
          nomeSis={nomeSis}
          descricaoSis={descricaoSis}
          menus={menus}
          breadcrumb={breadcrumb}
          children={children}
          onChangeMenu={onChangeMenu}
        />
      </AuthProvider>
    </ConfigProvider>
  );
};

export default Framework;
