import { hasProfile } from "@/server/db/queries"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function AuthenticatedRoute() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const userId = session?.user?.id;
  if (!userId) {
    redirect("/signin");
  }

  const profile = await hasProfile(userId);
  if (!profile) {
    redirect("/onboarding");
  } else {
    redirect("/dashboard");
  }

  return null;
}

function Loading() {
  return <div>Loading...</div>;
}

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthenticatedRoute />
    </Suspense>
  );
}
