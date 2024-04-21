import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { User } from "@/types/user.type";

import { loginUser } from "./auth";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      // user that comes from the authorization is of custom type User rather User | AdapterUser from the next-auth
      const authorizedUser: User = user as User;
      if (trigger === "update" && token.user) {
        token.user = { ...token.user, ...session };
      }

      if (user) {
        return {
          ...token,
          user: {
            id: authorizedUser.id,
            username: authorizedUser.username,
            firstName: authorizedUser.firstName,
            lastName: authorizedUser.lastName,
            imageUrl: authorizedUser.imageUrl,
          },
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
