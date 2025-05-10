import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOut from "../(auth)/signout";



export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const userId = session?.user?.id;
  const name = session?.user.name
  const email = session?.user.email
  return (
    <div className="text-center justify-center">
      <p>{userId}</p>
      <p>{name}</p>
      <p>{email}</p>
      <SignOut />
    </div>
  )

}

