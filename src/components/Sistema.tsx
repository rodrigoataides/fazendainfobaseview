import "../index.css";
import {
  PoweroffOutlined,
  EyeOutlined,
  QuestionCircleFilled,
  EyeInvisibleOutlined,
  StarFilled,
  MenuOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  MenuProps,
  Breadcrumb,
  Layout,
  Menu,
  Space,
  Avatar,
  theme,
  Row,
  ConfigProvider,
  Tooltip,
  Button,
  Col,
  Popover,
  Modal,
  List,
  Drawer,
  Divider,
  Tag,
  DrawerProps,
} from "antd";
import React, { ReactElement, Suspense, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../contexts/auth/AuthProvider";
import {
  sistemaDescricao,
  sistemaName,
  sistemaVersao,
} from "../configs/sistemaConfigAppBase";
import ptBR from "antd/lib/locale/pt_BR";
import Title from "antd/es/typography/Title";
import { removeParameterUrl } from "../utils/UtilsSistema";
import { menuAppBase } from "./MenuAppBase";
import BoasVindas from "./BoasVindas";
import ComponentOffLine from "./ComponentOffLine";
import Redirecionamento from "./Redirecionamento";
import Sider from "antd/es/layout/Sider";

//Load lazy module fundation
const PessoaFisica = React.lazy(
  async () =>
    await import("pessoafisica/PessoaFisica").catch(() => {
      return { default: () => <ComponentOffLine /> };
    })
);

//Load lazy module fundation
const PessoaJuridica = React.lazy(
  async () =>
    await import("pessoajuridica/PessoaJuridica").catch(() => {
      return { default: () => <ComponentOffLine /> };
    })
);

const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

type Menu = {
  label: string;
  key: string;
  icon: ReactElement;
  link: string;
  perfis: [];
  children: [];
};

export const Sistema = () => {
  const auth = useAuth();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [unidades, setUnidades] = useState([{ nome: "", codigo: 0 }]);
  const [openModalUnidade, setOpenModalUnidade] = useState(false);
  const [unidade, setUnidade] = useState<{
    nome: string;
    codigo: number;
  } | null>(null);
  const [itemsMenu, setItemsMenu] = useState<MenuItem[] | []>([]);
  const [visibleSensive, setVisibleSensive] = useState(false);
  const [chave, setChave] = useState("1");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [acessoSim, setAcessoSim] = useState(false);

  const breadcrumb: any = {
    1: <span>Seja bem vindo</span>,
    3: <span>Administração / Pessoa Física</span>,
    4: <span>Administração / Pessoa Jurídica</span>,
  };

  const rotas = (item: any) => {
    //console.log("Menu Selecionado: ", item.key);
    setChave(item.key);
    setOpen(false);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [nomeSistema, setNomeSistema] = useState(sistemaName);
  const [descricaoSistema, setDescricaoSistema] = useState(sistemaDescricao);
  const [screen, setScreen] = useState(window.screen.width);
  /*let itensBreadcrumb = "";
  breadcrumb != null ?? (itensBreadcrumb = breadcrumb![chave]);*/

  const MontaMenu = () => {
    const items: MenuItem[] = [];
    const rootMenu: string[] = [];
    const menus = menuAppBase;
    if (menus !== null) {
      menus.map((menu) => {
        //loop para ver se o perfil do usuario tem permissão para o menu
        let autorizado = false;
        const perfils: any = auth?.user?.perfilSistema;
        if (perfils?.includes("ADM_FI")) {
          autorizado = true;
        } else {
          auth?.user?.perfilSistema!.map((perfil: any) => {
            //console.log("menu Usuario: ", perfil);
            menu.perfis.map((menuPerf) => {
              if (perfil.sigla.includes(menuPerf)) {
                autorizado = true;
              }
            });
          });
        }

        if (autorizado) {
          if (menu.children.length > 0) {
            const menuChildren: MenuItem[] = [];
            menu.children.map((child: any) => {
              menuChildren.push(getItem(child.label, child.key, child.icon));
            });
            items.push(getItem(menu.label, menu.key, menu.icon, menuChildren));
          } else {
            items.push(getItem(menu.label, menu.key, menu.icon));
          }
          rootMenu.push(menu.key);
        }
      });
    }
    setItemsMenu(items);
  };

  /*const getUnidades = () => {
    const unidadex = auth?.user?.unidade;
    const unidadesx = auth?.user?.unidadesDeTrabalho;
    const unidadeN: any = [];
    unidadeN.push({ nome: unidadex?.nome, codigo: unidadex?.id });
    unidadesx?.map((item: any) => {
      if (unidadex?.id !== item.unidadeId) {
        unidadeN.push({ nome: item.unidadeNome, codigo: item.unidadeId });
      }
    });
    setUnidades(unidadeN);

    if (
      localStorage.getItem("localId") &&
      localStorage.getItem("localId") !== "0" &&
      localStorage.getItem("localId") !== ""
    ) {
      setUnidade({
        nome: localStorage.getItem("localNome")!,
        codigo: parseInt(localStorage.getItem("localId")!),
      });
    } else {
      if (unidadex !== undefined) {
        localStorage.setItem("localId", unidadex!.id!.toString());
        localStorage.setItem("localNome", unidadex!.nome!);
        setUnidade({ codigo: unidadex!.id!, nome: unidadex!.nome! });
      } else {
        localStorage.setItem("localId", "0");
        localStorage.setItem("localNome", "Clique aqui e selecione.");
        setUnidade({
          codigo: 0,
          nome: "Clique aqui e selecione.",
        });
      }
    }
  };*/

  const openModalSelectUnidade = () => {
    //setOpenModalUnidade(true);
  };

  const onCloseSelectUnidade = () => {
    //setOpenModalUnidade(false);
  };

  const setUnidadeClick = (unidade: { nome: string; codigo: number }) => {
    localStorage.setItem("localId", unidade.codigo.toString());
    localStorage.setItem("localNome", unidade.nome);
    setUnidade(unidade);
    setOpenModalUnidade(false);
    window.location.reload();
  };

  const actionDrawer = () => {
    //setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    document.title = sistemaName;
    //getUnidades();
    MontaMenu();
    removeParameterUrl("access_token");
    //setMigalhas([{ title: window.location.pathname }]);
    /*if (window.location.pathname === "/") {
        navitate("/dashboard");
      }*/
    setScreen(window.screen.width);
  }, [auth]);

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
      <>
        <Layout
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <Drawer
            title={
              <Row>
                <Col>
                  <div className="logo" />
                </Col>
                <Col style={{ paddingLeft: 10 }}>
                  <Row>
                    <Title
                      style={{
                        fontSize: screen > 800 ? 20 : 14,
                        marginTop: screen > 800 ? -5 : -10,
                        fontWeight: 600,
                      }}
                    >
                      {nomeSistema}
                    </Title>
                  </Row>
                  <Row
                    style={{
                      fontSize: screen > 800 ? 12 : 9,
                      color: "#00000080",
                      marginTop: screen > 800 ? -10 : -5,
                      paddingBottom: 5,
                    }}
                  >
                    {descricaoSistema}
                  </Row>
                </Col>
              </Row>
            }
            placement={"left"}
            closable={false}
            onClose={onClose}
            open={open}
            key={placement}
            style={{ paddingInline: 10 }}
            extra={
              <Space>
                <Button onClick={onClose}>
                  <CloseCircleOutlined />
                </Button>
              </Space>
            }
          >
            <Row style={{ display: "flex", justifyContent: "left" }}>
              <Space>
                <Avatar
                  src={"icon.png"}
                  style={{ marginRight: 5, marginTop: -10 }}
                >
                  {auth?.user?.name} - {/*auth?.user?.funcao*/}
                </Avatar>
                <Col>
                  <Row
                    onClick={() => actionDrawer()}
                    className="click"
                    style={{ color: "#000" }}
                  >
                    <strong
                      style={{
                        marginRight: 5,
                        fontSize: screen > 800 ? 12 : 9,
                      }}
                    >
                      {auth?.user?.name}
                    </strong>
                  </Row>
                  {visibleSensive ? (
                    <Row>
                      <Col
                        style={{
                          fontSize: screen > 800 ? 10 : 8,
                          color: "#00000080",
                          marginTop: 2.5,
                        }}
                      >
                        {auth?.user?.cpf} - {/*auth?.user?.funcao*/}
                      </Col>
                      <Col style={{ marginTop: 2, paddingLeft: 5 }}>
                        <EyeInvisibleOutlined
                          onClick={() => setVisibleSensive(!visibleSensive)}
                          className="click"
                          size={screen > 800 ? 14 : 9}
                          style={{ color: "red" }}
                        />
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col
                        style={{
                          fontSize: screen > 800 ? 10 : 8,
                          color: "#00000080",
                          marginTop: 2.5,
                        }}
                      >
                        *********** - ****************
                      </Col>
                      <Col style={{ marginTop: -2, paddingLeft: 5 }}>
                        <EyeOutlined
                          onClick={() => setVisibleSensive(!visibleSensive)}
                          className="click"
                          style={{ color: "#000" }}
                        />
                      </Col>
                    </Row>
                  )}
                </Col>
                {/*{acessoSim === false ?? (
                    <Button
                      shape='circle'
                      icon={
                        <PoweroffOutlined
                          style={{ color: "red" }}
                          title={"Sair"}
                        />
                      }
                      onClick={auth?.logoutSSO}
                    />
                  )}*/}
                {/**/}
              </Space>
            </Row>
            <Divider>Unidade Selecionada</Divider>
            <Row>
              <Row
                style={{
                  fontSize: screen > 800 ? 12 : 9,
                  color: "#00000080",
                  paddingLeft: screen > 800 ? 20 : 15,
                }}
              >
                Unidade&nbsp;
                <Popover title="Clique no nome abaixo para trocar de unidade.">
                  <QuestionCircleFilled />
                </Popover>
              </Row>
              <Row>
                <Title style={{ fontSize: screen > 800 ? 14 : 9 }}>
                  <Button
                    style={{
                      color: "#000000",
                      fontSize: screen > 800 ? 14 : 10,
                      fontWeight: 600,
                    }}
                    type="link"
                    onClick={() => openModalSelectUnidade()}
                  >
                    {unidade ? unidade?.nome : "Selecione uma unidade!"}
                  </Button>
                </Title>
              </Row>
            </Row>
            <Divider>Menu</Divider>
            <Menu
              theme="light"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={itemsMenu}
              onSelect={rotas}
              inlineCollapsed={false}
            />
          </Drawer>
          <Header
            style={{
              background: "transparent",
              borderRadius: "0px 0px 5px 5px",
              height: 40,
            }}
          >
            <Row
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                padding: 5,
                marginTop: -5,
              }}
            >
              <Col span={2}>
                {/*<Button
                  type="primary"
                  icon={<MenuOutlined />}
                  onClick={showDrawer}
                  size="small"
            ></Button>*/}
                <img width={80} src={"/img/LOGO TELA LOGIN.png"} />
              </Col>
              <Col span={16}>
                <Row
                  style={{
                    fontSize: 20,
                    marginTop: -5,
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {nomeSistema}
                </Row>

                <Row
                  style={{
                    fontSize: 12,
                    color: "#FFFFFF80",
                    marginTop: -45,
                    paddingBottom: 5,
                  }}
                >
                  {descricaoSistema}
                </Row>
              </Col>
              <Col
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignContent: "right",
                }}
              >
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignContent: "right",
                  }}
                >
                  <Space>
                    <Avatar
                      src={"icon.png"}
                      style={{ marginRight: 5, marginTop: -10 }}
                    >
                      {auth?.user?.name[0]}
                    </Avatar>
                    <Col>
                      <Row
                        onClick={() => actionDrawer()}
                        className="click"
                        style={{ color: "#fff", marginTop: -10 }}
                      >
                        <strong
                          style={{
                            marginRight: 5,
                            fontSize: 12,
                          }}
                        >
                          {auth?.user?.name}
                        </strong>
                      </Row>
                      {visibleSensive ? (
                        <Row>
                          <Col
                            style={{
                              fontSize: 10,
                              color: "#ffffff80",
                              marginTop: -45,
                            }}
                          >
                            {auth?.user?.cpf} - {/*auth?.user?.funcao*/}
                          </Col>
                          <Col style={{ marginTop: -45, paddingLeft: 5 }}>
                            <EyeInvisibleOutlined
                              onClick={() => setVisibleSensive(!visibleSensive)}
                              className="click"
                              size={14}
                              style={{ color: "red" }}
                            />
                          </Col>
                        </Row>
                      ) : (
                        <Row>
                          <Col
                            style={{
                              fontSize: 14,
                              color: "#ffffff80",
                              marginTop: -45,
                            }}
                          >
                            ***.***.***-**
                          </Col>
                          <Col style={{ marginTop: -45, paddingLeft: 5 }}>
                            <EyeOutlined
                              onClick={() => setVisibleSensive(!visibleSensive)}
                              className="click"
                              style={{ color: "#fff" }}
                            />
                          </Col>
                        </Row>
                      )}
                    </Col>

                    <Button
                      shape="circle"
                      icon={
                        <PoweroffOutlined
                          style={{ color: "red" }}
                          title={"Sair"}
                        />
                      }
                      onClick={auth?.logoutSSO}
                    />
                  </Space>
                </Row>
              </Col>
            </Row>
          </Header>
          <Layout style={{ marginTop: 20, background: "transparent" }}>
            <Sider style={{ background: "transparent" }}>
              <Menu
                theme="light"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={itemsMenu}
                onSelect={rotas}
                inlineCollapsed={false}
                style={{
                  borderRadius: 8,
                  background: "#0B0B3BBD",
                }}
              />
            </Sider>

            <Content
              style={{
                margin: "5px",
              }}
            >
              <Row>
                <Col>
                  <Breadcrumb
                    style={{
                      margin:
                        screen > 800
                          ? "10px 0px 0px 10px"
                          : "10px 0px 0px 40px",
                      color: "black",
                    }}
                  >
                    <Breadcrumb.Item className="menu">
                      <Tag color="black">{breadcrumb[chave]}</Tag>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <div style={{ padding: 10, minHeight: 360 }}>
                    <AuthProvider>
                      <>
                        {
                          {
                            1: <BoasVindas />,
                            3: (
                              <Suspense fallback={<Redirecionamento />}>
                                <PessoaFisica />
                              </Suspense>
                            ),
                            4: (
                              <Suspense fallback={<Redirecionamento />}>
                                <PessoaJuridica />
                              </Suspense>
                            ),
                          }[chave]
                        }
                      </>
                    </AuthProvider>
                  </div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
        <Footer
          style={{
            position: "fixed",
            bottom: -15,
            right: 10,
            backgroundColor: "transparent",
            color: "#fff",
            fontSize: 12,
          }}
        >
          Fazenda Info ©2021 - Version: {process.env.APP_VERSION}
        </Footer>
        <Modal
          title={"Escolha uma unidade"}
          open={openModalUnidade}
          footer
          width={600}
          onCancel={onCloseSelectUnidade}
        >
          <List>
            {unidades.map((item, index) => {
              return (
                <List.Item key={index} className="star">
                  <Button
                    type="link"
                    onClick={() => setUnidadeClick(item)}
                    style={{ color: "#000000" }}
                  >
                    <StarFilled />
                    {item.nome}
                  </Button>
                </List.Item>
              );
            })}
          </List>
        </Modal>
        <Drawer
          title="Dados do Usuário"
          placement="right"
          onClose={actionDrawer}
          open={openDrawer}
          style={{ color: "#000" }}
        >
          <p style={{ fontSize: 18, fontWeight: 700 }}>{auth?.user?.name}</p>
          <p>
            {/*auth?.user?.corporacaoAtual
                ? auth?.user?.corporacaoAtual.nome
            : ""*/}
            {/*" "*/}- {/*auth?.user?.funcao*/}
          </p>
          <Divider>Unidades</Divider>
          <p>Unidade:</p>
          <p>{/*auth?.user?.unidade.nome*/}</p>
          <Divider />
          <p>Unidades de Trabalho:</p>
          <p>&nbsp;</p>
          {/*auth?.user?.unidadesDeTrabalho.map((unidade: any) => {
              // eslint-disable-next-line react/jsx-key
              return <p>- {unidade.unidadeNome}</p>;
            })*/}
          <Divider>Sistemas</Divider>
          <p>
            <strong>Sistema / Perfil</strong>
          </p>
          <p>&nbsp;</p>
          {/*auth?.user?.perfis.map((perfil: any) => {
              let sistema: JSX.Element | null = null;
              if (perfil.sistema.descricao == sistemaName) {
                sistema = (
                  <p>
                    <strong>
                      {perfil.sistema.descricao.toUpperCase()} /{" "}
                      {perfil.descricao}
                    </strong>
                  </p>
                );
              } else {
                sistema = (
                  <p>
                    {perfil.sistema.descricao.toUpperCase()} /{" "}
                    {perfil.descricao}
                  </p>
                );
              }
              return sistema;
            })*/}
        </Drawer>
      </>
    </ConfigProvider>
  );
};

export default Sistema;
