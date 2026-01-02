"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/authStore";

export default function DashboardLayout({ children }) {
  const { data, status } = useSession();
  const setToken = useAuthStore((s) => s.setToken);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (data?.accessToken) setToken(data.accessToken);
  }, [data]);

  if (!mounted || status === "loading") return null;

  return children;
}
