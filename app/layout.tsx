'use client';

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import { useEffect, useState } from "react";
import { metadata } from '@/lib/siteMetadata';
import moment from "moment";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <html lang="pt-br">
      <head>
        <title>{metadata.title as any || 'Default Title'}</title>
        <meta name="description" content={metadata.description || 'Default Description'} />
      </head>
      <body className={`min-h-screen antialiased`}>

        <SessionProvider>
          {isMounted && (
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster richColors position="top-right" duration={3000} closeButton />
            </ThemeProvider>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
