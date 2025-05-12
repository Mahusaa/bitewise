import { getProfile } from "@/server/db/queries"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Settings from "@/components/settings";


export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const userId = session?.user?.id;
  if (!userId) {
    redirect("/whoami")
  }
  const profile = await getProfile(userId);
  if (!profile) {
    redirect("/onboarding")
  }
  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <Settings profile={profile} />
    </div>
  )
}
