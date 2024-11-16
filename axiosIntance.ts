import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000/api',
    baseURL: 'http://chatterbox.interactweb.agency/api',
    withCredentials: true
})


axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  const getUserByTokenUsingRefreshToken = async (refreshToken: any) => {
    try {
      const res = await axiosInstance.post("/auth/user-by-token", {
        refreshToken,
      });
      if (res.status === 200) {
        return res.data.token;
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
  
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        const originalRequest = error.config;
        if (originalRequest._retry) {
          return Promise.reject(error);
        }
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            return Promise.reject(error);
          }
          const newAccessToken = await getUserByTokenUsingRefreshToken(
            refreshToken
          );
          localStorage.setItem("accessToken", newAccessToken);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
  
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
export default axiosInstance;