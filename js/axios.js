// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000/api',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// axiosInstance.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     console.log('Request config headers:', config.headers);
//     return config;
//   },
//   error => Promise.reject(error)
// );
// axiosInstance.interceptors.response.use(
//   response => {
//   return response;
//   },
//   error => {
//     if (error.response && error.response.status === 401) {
//       console.log('Token expiré ou invalide, redirection vers la page de connexion');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


