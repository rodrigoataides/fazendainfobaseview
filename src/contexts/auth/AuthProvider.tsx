import React from "react";
import { sistemaName } from "../../configs/sistemaConfigAppBase";
import { urlsServices } from "../../configs/urlsConfigAppBase";
import { useAxiosSSO } from "../../hooks/useAxiosSSO";
import { UserType } from "../../types/UserType";
import { getParameterUrl } from "../../utils/UtilsSistema";
import { createContext, useContext, useState } from "react";
import AuthUtils from "./AuthUtils";
import { message } from "antd";

export type AuthContextType = {
  user: UserType | null;
  validado: boolean;
  setUserSSO: (us: UserType) => void;
  logoutSSO: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const apiAxios = useAxiosSSO();
  const [user, setUser] = useState<UserType | null>(null);
  const [validado, setValidado] = useState<boolean>(false);

  const validaToken = async (token: string) => {
    await apiAxios
      .validaTokenSSO(token)
      .then((res: { data: any }) => {
        try {
          if (res.data.status) {
            //const userValidation = AuthUtils.prepareDataUser(res.data);
            localStorage.setItem("token_sso", token);
            //setar o token valido para o usuario
            let usuario = res.data.data;
            usuario.token = token;
            console.log("usuario: ", usuario);
            setUser(usuario);
            setValidado(true);
          } else {
            setUser(null);
            setValidado(false);
            localStorage.removeItem("token_sso");
            window.location.href = `${
              urlsServices.SSOWS
            }auth?response_type=token_only&client_id=${sistemaName}&redirect_uri=${encodeURIComponent(
              window.location.href.replace("#", "|").split("/?access_token")[0]
            )}`;
          }
        } catch (error) {
          setUser(null);
          setValidado(false);
          localStorage.removeItem("token_sso");
          window.location.href = `${
            urlsServices.SSOWS
          }auth?response_type=token_only&client_id=${sistemaName}&redirect_uri=${encodeURIComponent(
            window.location.href.replace("#", "|").split("/?access_token")[0]
          )}`;
        }
      })
      .catch((err: any) => {
        setUser(null);
        setValidado(false);
        localStorage.removeItem("token_sso");
        window.location.href = `${
          urlsServices.SSO
        }auth?response_type=token_only&client_id=${sistemaName}&redirect_uri=${encodeURIComponent(
          window.location.href.replace("#", "|").split("/?access_token")[0]
        )}`;
        message.error({
          content: "Erro ao tentar validar seu token! Você será redirecionado.",
          //duration: 5,
        });
      });
  };

  const setUserSSO = (us: UserType | null) => {
    setUser(us);
  };

  /*const setVariaveisSis = (variaveis: Props | null) => {
    console.log("AuthProvider: ", variaveis);
    setVariaveis(variaveis);
  };*/

  const logoutSSO = async () => {
    await apiAxios.logoutSSO().then((res: any) => {
      setUser(null);
      setValidado(false);
      localStorage.removeItem("token_sso_fi");
    });
  };

  const tokenParam = getParameterUrl("access_token");

  if (
    localStorage.getItem("token_sso") &&
    localStorage.getItem("token_sso") !== "" &&
    localStorage.getItem("token_sso") !== null &&
    localStorage.getItem("token_sso") !== undefined
  ) {
    if (user?.token !== localStorage.getItem("token_sso")!) {
      //validar
      validaToken(localStorage.getItem("token_sso")!);
      //localStorage.removeItem('token_sso_fi');
    }
  } else if (tokenParam) {
    //validar
    validaToken(tokenParam);
  } else {
    setUser(null);
    setValidado(false);
    window.location.href = `${
      urlsServices.SSO
    }auth?response_type=token_only&client_id=${sistemaName}&redirect_uri=${encodeURIComponent(
      window.location.href.replace("#", "|").split("/?access_token")[0]
    )}`;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        validado,
        setUserSSO,
        logoutSSO,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
