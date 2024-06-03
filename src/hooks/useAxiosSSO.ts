import { getConfigLaravel as getConfig } from '../configs/sistemaConfigAppBase';
import { urlsServices } from '../configs/urlsConfigAppBase';
import axios from 'axios';

const api = axios.create({
  baseURL: urlsServices.SSOWS,
  //withCredentials: true,
});

export const useAxiosSSO = () => ({
  
  validaTokenSSO: async (token: string) => {    
    const response = await api.get('auth/profile', {
 headers: {
   Authorization: 'Bearer ' + token //the token is a variable which holds the token
 }
});
    return response;
  },

  logoutSSO: async () => {
    const response = await api.get(
      `auth/logout`,
      getConfig('priv'),
    );
    return response;
  },
});
