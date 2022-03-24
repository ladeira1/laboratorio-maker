import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env


const nextAuth = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        }
      },
    })
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        return profile.email_verified
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  }
})

export default nextAuth;