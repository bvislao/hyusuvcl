import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import {  createUser,getUser } from "./actions";
import { SessionInterface, UserProfile } from "../../common.types";
import {debug} from "util";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  theme: {
    colorScheme: "dark",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;
      console.log("sessionEmail",session);
      try {
        const data =await getUser(email) as { user?: UserProfile }
        if(data == null) {
          throw new Error("User not found");
        }
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data,
          },
        };
       
        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    async signIn({ user }: {
      user: AdapterUser | User
    }) {
      try {
        const userExists = await getUser(user?.email as string) as { user?: UserProfile }
        if(!userExists) {
          return false;
        }
        //console.log("userExists",userExists.mongoDB?.userCollection?.edges[0].node.email);
        if (!user.email) {
          return false;//await createUser(user.name as string, user.email as string)
          }

        return true;
      } catch (error: any) {
        return false;
      }
    },
  },
};

 export async function getCurrentUser() {
   const session = await getServerSession(authOptions) as SessionInterface;
   return session;
 }