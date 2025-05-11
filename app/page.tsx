import { hasProfile } from "@/server/db/queries"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/signin")
  };
  const profile = await hasProfile(userId)

  if (!profile) {
    redirect("/onboarding")
  } else {
    redirect("/dashboard")
  }
}

