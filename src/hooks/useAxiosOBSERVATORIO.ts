import { getConfigLaravel as getConfig } from '../configs/sistemaConfigAppBase';
import { urlsServices } from '../configs/urlsConfigAppBase';
import axios from 'axios';

const api = axios.create({
    baseURL: urlsServices.OBSERVATORIO,
})