import React from "react";
import {
  AppstoreAddOutlined,
  CaretRightOutlined,
  FileTextOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { perfisSistema } from "../configs/sistemaConfigAppBase";

export const menuAppBase = [
  {
    label: "Bem vindo",
    key: "1",
    icon: <HomeOutlined />,
    link: "/boas_vindas",
    perfis: [
      perfisSistema.ADM,
      perfisSistema.MASTER,
      perfisSistema.GESTOR,
      perfisSistema.OPERACIONAL,
    ], //Pode ter mais de um perfil.
    children: [],
  },
  {
    label: "Administração",
    key: "2",
    icon: <AppstoreAddOutlined />,
    link: "/administracao",
    perfis: [
      perfisSistema.ADM,
      perfisSistema.MASTER,
      perfisSistema.GESTOR,
      perfisSistema.OPERACIONAL,
    ],
    children: [
      {
        label: "Pessoa Física",
        key: "3",
        icon: <CaretRightOutlined />,
        link: "/pessoafisica",
        perfis: [
          perfisSistema.ADM,
          perfisSistema.MASTER,
          perfisSistema.GESTOR,
          perfisSistema.OPERACIONAL,
        ],
        children: [],
      },
      {
        label: "Pessoa Jurídica",
        key: "4",
        icon: <CaretRightOutlined />,
        link: "/pessoafisica",
        perfis: [
          perfisSistema.ADM,
          perfisSistema.MASTER,
          perfisSistema.GESTOR,
          perfisSistema.OPERACIONAL,
        ],
        children: [],
      },
    ],
  },
];
