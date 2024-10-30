'use client';

import { Toaster } from "@/components/ui/sonner";
import { metadata } from '@/lib/siteMetadata';
import { ThemeProvider } from "next-themes";
import { Inter } from 'next/font/google';
import { Suspense, useEffect, useState } from "react";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Loading from "./main/loading";

const inter = Inter({
  subsets: ['latin'], // Define o conjunto de caracteres que você precisa
  weight: ['200', '300', '400', '500', '600', '700'], // Você pode ajustar os pesos conforme necessário
  variable: '--font-inter', // Usar como uma variável CSS para facilidade
});

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
    <html lang="pt-br" className={inter.variable}>
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
