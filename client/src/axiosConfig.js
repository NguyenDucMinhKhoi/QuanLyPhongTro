import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Get token from localStorage
    const authData = window.localStorage.getItem("persist:auth");
    let token = null;

    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        // Handle different token formats
        if (parsedAuth.token) {
          token = parsedAuth.token.replace(/"/g, ""); // Remove quotes if present
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
      }
    }

    // Add token to headers if it exists
    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Handle 401 errors
    if (error.response && error.response.status === 401) {
      // Clear auth data and redirect to login
      window.localStorage.removeItem("persist:auth");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
