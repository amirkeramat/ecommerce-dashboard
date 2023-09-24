import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import ModalProvider from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

import "./globals.css";
import Container from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Container>
            <NextTopLoader height={5} />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ToastProvider />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </Container>
        </body>
      </html>
    </ClerkProvider>
  );
}
