import React, { createContext, useContext, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   MOCK CREDENTIALS  (change these to your own)
───────────────────────────────────────────── */
const ADMIN_EMAIL = "abukarhussein93@gmail.com";
const ADMIN_PASSWORD = "Hussein_9098";
const TOKEN_KEY = "admin_token";
// A simple signed token representation (no real JWT needed for a static site)
const VALID_TOKEN = "portfolio_admin_authenticated_v1";

/* ─────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────── */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const isAdmin = token === VALID_TOKEN;

  /** Returns { success, error } */
  const login = useCallback((email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(TOKEN_KEY, VALID_TOKEN);
      setToken(VALID_TOKEN);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password." };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

/* ─────────────────────────────────────────────
   API SECURITY LAYER
   All mutating operations go through this helper.
   It checks the token before touching data.
───────────────────────────────────────────── */
export function verifyAdminToken(token) {
  if (token !== VALID_TOKEN) {
    throw new Error("401 Unauthorized: Admin access required.");
  }
}
