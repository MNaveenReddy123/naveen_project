"use client";
import React, { createContext, useState, useContext } from "react";

type AuthContextType = {
  role: string;
  login: (role: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string>("");

  const login = (role: string) => {
    setRole(role); // Save role (admin or customer)
    localStorage.setItem("role", role); // Persist role in localStorage
  };

  const logout = () => {
    setRole(""); // Clear the role
    localStorage.removeItem("role"); // Clear role from localStorage
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
