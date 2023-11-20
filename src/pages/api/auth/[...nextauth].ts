import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import 'global-agent/bootstrap';


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      // httpOptions: {
      //   timeout: 10000,
      // }
    })
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)