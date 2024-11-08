import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/mongo/models/User";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("No credentials provided");
          throw new Error("No credentials provided");
        }

        await connectToDatabase();

        const user = await User.findOne({ username: credentials.username });
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return { id: user._id, username: user.username };
        }
        throw new Error("Invalid username or password");
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
