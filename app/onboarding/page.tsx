import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Onboarding from "@/components/onboarding";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const userId = session?.user?.id;
  if (!userId) {
    redirect("/signin")
  };
  return (
    <Onboarding userId={userId} />
  )
}

