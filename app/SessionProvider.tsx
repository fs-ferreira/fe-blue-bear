"use client";

import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionProviderProps {
    children: ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
    return <NextAuthProvider>{children}</NextAuthProvider>;
};

export default SessionProvider;
