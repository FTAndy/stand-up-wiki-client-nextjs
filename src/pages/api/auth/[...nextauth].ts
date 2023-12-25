import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import type {AuthOptions} from 'next-auth';
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import {getMongoClient} from '@/service/mongo-client'
import 'global-agent/bootstrap';


export const authOptions: AuthOptions = {
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
  // adapter: MongoDBAdapter(getMongoClient(), {
  //   databaseName: 'standup-wiki'
  // }),
  callbacks: {
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          userId: user.id
        }
      }
    },
  }
}

export default NextAuth(authOptions)