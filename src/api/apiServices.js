import axios from "axios";

const base_url = "https://support.adegroup.tech/api/v1/";
export const SMS_PRICE_BASE_URL = base_url;

// ------------------- CONFIGURATION -------------------

export const apiClient = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});

export const adminApi = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});

/**
 * Robust Interceptor: 
 * Ensures the LATEST token is grabbed from localStorage for every single request.
 * This prevents 403 errors that occur when the token changes after login.
 */
const authInterceptor = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = "application/json";
  }
  return config;
};

apiClient.interceptors.request.use(authInterceptor);
adminApi.interceptors.request.use(authInterceptor);

// ------------------- AUTHENTICATION -------------------

export const loginUser = async ({ email, password }) => {
  try {
    const res = await apiClient.post("auth/login", { email, password });
    const { success, data, message } = res.data;

    if (!success) throw new Error(message || "Login failed");

    const access_token = data.accessToken || data.access_token;
    const refresh_token = data.refreshToken || data.refresh_token;
    const user = data.user;
    const rawRole = data.user_type || data.user?.role || data.role || "user";
    const role = rawRole.toLowerCase().replace(/_/g, "");

    localStorage.setItem("token", access_token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));

    const authHeader = `Bearer ${access_token}`;
    apiClient.defaults.headers.common["Authorization"] = authHeader;
    adminApi.defaults.headers.common["Authorization"] = authHeader;

    return { user, token: access_token, refreshToken: refresh_token, role };
  } catch (err) {
    throw new Error(
      err.response?.data?.message || err.message || "Invalid credentials"
    );
  }
};

