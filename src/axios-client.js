import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// const axiosClient = axios.create({
//   baseURL: `${import.env.REACT_APP_API_URL}/api`,
// })

const axiosClient = axios.create({
  baseURL: `${apiUrl}/api`, // Assuming your API endpoints are under the "/api" path
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
    // window.location.reload();
  } else if (response.status === 404) {
  }

  throw error;
})

export default axiosClient
