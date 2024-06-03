export const sistemaName = 'Fazenda Info';
export const sistemaDescricao = 'Sistema de controle de fazendas.';
export const sistemaVersao = '1.0.0-00';
export const domainNameProd = 'fazendainfo.com.br';
export const domainNameHomo = 'fazendainfo.rdca.com.br';
export const domainNameDesv = 'localhost';

export const perfisSistema = {
  ADM: 'ADM_FI',
  MASTER: 'MST_FI',
  GESTOR: 'GST_FI',
  OPERACIONAL: 'OPR_FI',

  //CRIAR ATOR PARA OS DIVERSOS PERFIS DO SEU SISTEMA.
  
};

export const getConfig = (type: string) => {
  const configPub = {
    headers: {
      'Access-Control-Allow-Origin': `${window.location.origin}`,
      'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTION',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  const configPriv = {
    headers: {
      'Access-Control-Allow-Origin': `${window.location.origin}`,
      'Access-Control-Allow-Headers': 'Authorization',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTION',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('token_sso')}`,
    },
  };

  if(type === "priv"){
    return configPriv;
  } 
  return configPub;
};

export const getConfigLaravel = (type: string) => {
  const configPub = {
      headers: {
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "*",
          "Content-Type": "application/json;charset=UTF-8",
      }
  }
  const configPriv = {
      headers: {
          'Access-Control-Allow-Origin': window.location.origin,
          'Access-Control-Allow-Headers': 'Authorization',
          'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTION',
          'Content-Type': 'application/json;charset=UTF-8',
          "Authorization": `Bearer ${localStorage.getItem('token_sso')}`,
          "Tenant": `${localStorage.getItem('localId')}`,
          "Token": `${localStorage.getItem('token_sso')}`,
      }
  }
  const configPubFile = {
      headers: {
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "*",
          "Content-Type": 'multipart/form-data',
      }
  }
  const configPrivFile = {
      headers: {
          'Access-Control-Allow-Origin': window.location.origin,
          'Access-Control-Allow-Headers': 'Authorization',
          'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTION',
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem('token_sso')}`,
          "Tenant": `${localStorage.getItem('localId')}`,
          "Token": `${localStorage.getItem('token_sso')}`,
      }
  }
  if(type === "priv"){
    return configPriv;
  } else if(type === "pub"){
    return configPub;
  }else if(type === "privF"){
    return configPrivFile;
  } else if(type === "pubF"){
    return configPubFile;
  }
  //return configPub;
}
