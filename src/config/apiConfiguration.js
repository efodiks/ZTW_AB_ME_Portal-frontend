import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api/'
});

const authorizationRequestInterceptor = requestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`
    }
    return requestConfig
};

const delayingRequestInterceptor = timeOutInMs => requestConfig => {
    return new Promise(resolve =>
        setTimeout(() => resolve(requestConfig), timeOutInMs))
}

const errorLoggingResponseInterceptor = error => {
    console.log(error)
    return Promise.reject(error)
}

api.interceptors.request.use(authorizationRequestInterceptor);
//api.interceptors.request.use(delayingRequestInterceptor(2000))
api.interceptors.response.use(null, errorLoggingResponseInterceptor)

export default api;