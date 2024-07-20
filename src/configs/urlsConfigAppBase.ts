import { domainNameProd, domainNameDesv } from './sistemaConfigAppBase';
export const urlsServices = {
  SSO: 'https://sso.fazendainfo.com.br/',
  SSOWS: 'https://ssows.fazendainfo.com.br/api/',
  BACKENDWS: 'https://fazendainfobasews.fazendainfo.com.br/api/',
};
export let ambiente = '';

if (window.location.hostname.indexOf(domainNameProd) > -1) {
  urlsServices.SSO = 'https://sso.fazendainfo.com.br/';
  urlsServices.SSOWS = 'https://ssows.fazendainfo.com.br/api/';
  urlsServices.BACKENDWS = 'https://fazendainfobasews.fazendainfo.com.br/api/';
  ambiente = 'PROD';
} else {  
  urlsServices.SSO = 'https://fazendainfosso.rdca.com.br/';
  urlsServices.SSOWS = 'https://fazendainfossows.rdca.com.br/api/';
  urlsServices.BACKENDWS = 'https://fazendainfobasews.rdca.com.br/api/';
  ambiente = 'HOMO';
  if (window.location.hostname.indexOf(domainNameDesv) > -1) {
    //PARA DESENVOLVIMENTO
    urlsServices.SSO = 'http://localhost:3031/';
    urlsServices.SSOWS = 'http://localhost:8000/api/';
    urlsServices.BACKENDWS = 'http://localhost/api/';
    ambiente = 'DESV';
  }
}

