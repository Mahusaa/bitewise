"use server"


import { auth } from "@/lib/auth"


export const googleSignIn = async () => {
  await auth.api.signInSocial({
    body: {
      provider: "google"
    }
  })
}



