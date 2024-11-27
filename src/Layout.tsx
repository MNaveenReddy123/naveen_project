"use client";

import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import "@/styles/globals.css"; // Import global styles

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div>{children}</div>
    </AuthProvider>
  );
}
