import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import { Header } from "./components/Header";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next Write",
  description: "A simple blogging platform built with Next.js and Radix UI"
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="vsc-initialized">
        <Theme appearance="light" accentColor="sky" radius="large" scaling="110%">
          <AuthProvider>
            <Header />
            {children}
            <ThemePanel />
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
