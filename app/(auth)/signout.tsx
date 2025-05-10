"use client"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"



export default function SignOut() {
  return (
    <Button
      onClick={() => authClient.signOut()}
      variant="destructive"
    >
      Sign Out
    </Button>
  )
}
