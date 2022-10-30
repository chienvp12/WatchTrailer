import axios from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify({...params, api_key: apiConfig.apiKey})
});

//You can intercept requests or responses before they are handled by then or catch.
axiosClient.interceptors.request.use(async (config) => config);



axiosClient.interceptors.response.use((response) =>{
     // Any status code that lie within the range of 2xx cause this function to trigger
    if(response && response.data){
        return response.data;
    }
    return response;
},(error) =>{
     // Any status codes that falls outside the range of 2xx cause this function to trigger
    throw error;
});

export default axiosClient;
