"use client"

import { useSession } from "next-auth/react"

export const useUserRole = () => {
  const { data: session, status } = useSession()

  // status can be "loading", "authenticated", or "unauthenticated"
  const isLoading = status === "loading"
  
  // Extract the role from the session
  // Ensure your Next-Auth 'callbacks' are configured to expose 'role'
  const role = session?.user?.role || "guest"

  return {
    role,
    isLoading,
    isAdmin: role === "ADMIN",
    isUser: role === "user",
    session
  }
}