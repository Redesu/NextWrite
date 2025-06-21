import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import { Header } from "./components/Header";

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
      <body>
        <Theme appearance="light" accentColor="violet" radius="large">
          <Header />
          {children}
          <ThemePanel />
        </Theme>
      </body>
    </html>
  );
}
