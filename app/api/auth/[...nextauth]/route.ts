import { CORE_URL, TENANT_ID } from "@/lib/utils";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text", placeholder: "e@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;

                const res = await fetch(`${CORE_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "Content-Type": "application/json",
                        "X-Tenant-ID": TENANT_ID || '' 
                    }
                });

                const data = await res.json();

                if (res.ok && data.token) {
                    const currentTime = Date.now();

                    const expiresAt = new Date(currentTime + data.expiresIn).toISOString();

                    const user = {
                        id: data.id,
                        name: data.subject,
                        email: data.subject,
                        accessToken: data.token,
                        tenant: data.tenant,
                        role: data.role,
                        expiresAt,
                    };
                    return user;
                } else {
                    return null;
                }

            },
        }),
    ],
    pages: {
        signIn: '/', 
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.accessToken = user.accessToken;
                token.tenant = user.tenant;
                token.role = user.role;
                token.expiresAt = user.expiresAt;
                token.email = user.email;
                token.id = user.id;
            }
            if (token.expiresAt && new Date() > new Date(token.expiresAt)) {
                return {};
            }

            return token;
        },
        async session({ session, token }: any) {
            if (token.expiresAt && new Date() > new Date(token.expiresAt)) {
                session = null;
            } else {
                session.accessToken = token.accessToken;
                session.expires = token.expiresAt;
                session.user = {
                    email: token.email,
                    id: token.id,
                    role: token.role,
                    tenant: token.tenant,
                };
            }

            return session;
        }
    },
    jwt: {
        maxAge: 60 * 60,
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

