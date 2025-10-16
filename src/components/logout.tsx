"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"

export function Logout() {
  const handleLogout = async () => {
    await authClient.signOut
    console.log("LggedOut")
  }
  return (
  <Button variant="outline" onClick={handleLogout}>
    Logout <LogOut className="size-4"/>
  </Button>
  )
}