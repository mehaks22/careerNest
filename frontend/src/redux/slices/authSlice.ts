import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { id: string; email: string; role: string } | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Helper function to safely load user data from localStorage
const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem("user");
    if (!rawUser || rawUser === "undefined") return null;
    return JSON.parse(rawUser);
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return null;
  }
};

// Helper function to safely load token data from localStorage
const getStoredToken = () => {
  const token = localStorage.getItem("token");
  if (!token || token === "undefined") return null;
  return token;
};

const initialState: AuthState = {
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const setCredentials = login; // Exported alias for compatibility
export default authSlice.reducer;