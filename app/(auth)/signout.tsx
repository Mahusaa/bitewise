"use client"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function SignOut() {
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.refresh()
    router.push("/signin")
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="destructive"
    >
      Sign Out
    </Button>
  )
}
