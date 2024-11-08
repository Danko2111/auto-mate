"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children, session }) {
  const [theme, setTheme] = useState("nord"); // Default theme

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "nord" ? "sunset" : "nord"));
  };

  return (
    <SessionProvider session={session}>
      <div data-theme={theme} className="flex flex-col h-full">
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        {children}
      </div>
    </SessionProvider>
  );
}
