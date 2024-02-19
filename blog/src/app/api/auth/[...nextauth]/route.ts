import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/lib/database/user";
import { User } from "@/types/user.type";

const authOptions: AuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      // user that comes from the authorization is of custom type User rather User | AdapterUser from the next-auth
      const authorizedUser: User = user as User;

      if (user) {
        return {
          ...token,
          user: { id: authorizedUser.id, username: authorizedUser.username },
        };
      }

      return token;
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user as User;
      }

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          type: "text",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await loginUser(
          credentials.username,
          credentials.password,
        );
        return user;
      },
    }),
  ],
};

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
