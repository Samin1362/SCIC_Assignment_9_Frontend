import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://scic-assignment-9-rust.vercel.app/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token management for client-side
const TOKEN_KEY = "auth_token";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    // Also set a cookie for middleware to detect (not the actual token, just a flag)
    document.cookie = `auth_session=authenticated; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    // Also remove the cookie
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

// Add auth token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Items endpoints
export const getItems = async (params = {}) => {
  try {
    const response = await apiClient.get("/items", { params });
    // Backend returns { success: true, data: { items: [...], total, ... } }
    return response.data.data.items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await apiClient.get(`/items/${id}`);
    // Backend returns { success: true, data: { ...item } }
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching item ${id}:`, error);
    throw error;
  }
};

export const createItem = async (itemData) => {
  try {
    // Map frontend field names to backend field names
    const backendData = {
      name: itemData.name,
      description: itemData.description,
      price: itemData.price,
      category: itemData.category,
      stock: itemData.stock,
      imageUrl: itemData.image || itemData.imageUrl || "",
    };

    const response = await apiClient.post("/items", backendData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

// Auth endpoints
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    // Backend returns { success: true, data: { user, token, expiresAt } }
    const { token } = response.data.data;
    if (token) {
      setToken(token);
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await apiClient.post("/auth/logout");
    removeToken();
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error);
    // Still remove token even if API call fails
    removeToken();
    throw error;
  }
};

export const isLoggedIn = () => {
  return !!getToken();
};

export default apiClient;
