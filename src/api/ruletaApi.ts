import axios from 'axios';


const ruletaApi = axios.create({
    baseURL: 'https://back-rifa-production.up.railway.app/api/v1/ruleta'
});



ruletaApi.interceptors.request.use( config => {
    const token = localStorage.getItem('token');

    config.headers['Authorization'] = `Bearer ${token}`
 
    return config;
});

export default ruletaApi;