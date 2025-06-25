import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
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
      <body className="vsc-initialized">
        <Theme appearance="dark" accentColor="teal" radius="large" scaling="110%">
          <Header />
          {children}
          <ThemePanel />
        </Theme>
      </body>
    </html>
  );
}
