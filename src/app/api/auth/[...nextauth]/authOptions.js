import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        console.log("AUTHORIZE CALLED", credentials);

        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        const user = await res.json();
        console.log("DUMMYJSON RESPONSE", user);

        // 🔴 THIS LINE DECIDES EVERYTHING
        if (!res.ok || !user || !user.id) return null;

        // ✅ REQUIRED SHAPE (KEEP IT SIMPLE)
        return {
          id: String(user.id),
          name: user.username,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
};
