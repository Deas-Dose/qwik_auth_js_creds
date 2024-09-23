import { QwikAuth$ } from "@auth/qwik";
import Credentials from "@auth/qwik/providers/credentials";
import { getUserFromDb } from "~/utils/users.actions";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../../drizzle/db";
import { encode } from "@auth/core/jwt";
import { sessions } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

const adapter = DrizzleAdapter(db);

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    adapter,
    providers: [
      Credentials({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const { email, password } = credentials;
          const res = await getUserFromDb(email as string, password as string);
          if (res.success) return res.data;

          return null;
        },
      }),
    ],
    callbacks: {
      async jwt({ token, account }) {
        if (account?.provider === "credentials") {
          token.credentials = "credentials";
        }
        return token;
      },
    },
    jwt: {
      encode: async (params) => {
        if (params.token?.credentials) {
          const sessionToken = uuid();

          if (!params.token.sub) {
            throw new Error("No user id found");
          }

          // params.token.sub is the user id
          const session = await db.query.sessions.findFirst({
            where: eq(sessions.userId, params.token.sub),
          });

          if (session) {
            return session.sessionToken;
          }

          const createdSession = await adapter.createSession?.({
            sessionToken: sessionToken,
            userId: params.token.sub,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          });

          if (!createdSession) {
            throw new Error("Could not create session");
          }

          return sessionToken;
        }
        return encode(params);
      },
    },
  }),
);
