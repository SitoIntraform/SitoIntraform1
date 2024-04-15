import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        pss: { label: "pss", type: "text" },
      },
      authorize(credentials, req) {
        if (!credentials?.email || !credentials.pss) {
          throw new Error("Missing credentials");
        }

        if (credentials.email !== "info@intraform.it") {
          throw new Error("Invalid credentials");
        }

        if (credentials.pss !== "intraform") {
          throw new Error("Invalid credentials");
        }

        return {
          email: credentials?.email,
          id: "1",
        };
      },
    }),
  ],
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, //SESSIONE DI LUNGHEZZA MASSIMA 2 ORE
  },
};
