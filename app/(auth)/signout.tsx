"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react" // assuming you're using Lucide for icons

export default function SignOut() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await authClient.signOut()
      router.push("/signin")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="destructive"
      disabled={loading}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Signing out...
        </span>
      ) : (
        "Sign Out"
      )}
    </Button>
  )
}

