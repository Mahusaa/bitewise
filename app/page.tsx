import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default function Home() {
  const cookieStore = cookies()
  const hasProfile = cookieStore.has("user-profile")

  if (!hasProfile) {
    redirect("/onboarding")
  } else {
    redirect("/dashboard")
  }
}

