import NextAuth from "next-auth";

 import { authOptions } from "@/lib/session";

 const handler = NextAuth(authOptions);
 console.log(handler);
 export { handler as GET, handler as POST };