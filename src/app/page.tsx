"use client";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
