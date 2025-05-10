import { redirect } from "next/navigation"
import { hasProfile } from "@/server/db/queries"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const userId = session?.user?.id;

  if (!userId) {
    console.log("user not auth")
    return null
  };
  const profile = await hasProfile(userId)

  if (!profile) {
    console.log("U dont have profile")
    //   redirect("/onboarding")
  } else {
    console.log("u have profile")
    // redirect("/dashboard")
  }
}

